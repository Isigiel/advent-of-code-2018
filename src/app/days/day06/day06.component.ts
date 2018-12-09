import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Marker, Point } from './point';
import { interval, Observable } from 'rxjs';
import { PointGrid } from './pointGrid';
import { share, take } from 'rxjs/operators';

@Component({
  selector: 'app-day06',
  templateUrl: './day06.component.html',
  styleUrls: ['./day06.component.scss']
})
export class Day06Component implements OnInit {
  challengeInput = new FormControl(
    '1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9',
    Validators.required
  );
  currentStep = 0;
  grid$: Observable<{ id: string; mark: Marker }[][]>;
  point$: Observable<Point>;
  pointGrid: PointGrid;
  working = false;
  winner;
  @ViewChild('canvas') canvas: ElementRef;

  constructor() {}

  ngOnInit() {}

  async startAlgorithm() {
    this.working = true;
    const rows = this.challengeInput.value
      .split('\n')
      .map(p => p.trim())
      .filter(p => p);
    const cells = rows.map(r => r.split(',').map(c => c.trim()));
    const points = cells.map(
      (c, index) =>
        new Point(c[0], c[1], this.rainbow(cells.length, index), null, true)
    );
    const maxX = Math.max(1, ...points.map(p => p.x));
    const maxY = Math.max(1, ...points.map(p => p.y));
    console.log(maxX, maxY);
    this.pointGrid = new PointGrid(maxX, maxY);
    this.grid$ = this.pointGrid.grid;
    this.point$ = this.pointGrid.point$;
    this.setupDisplay();
    this.currentStep = 1;
    const counter = interval(50).pipe(
      take(points.length),
      share()
    );
    counter.subscribe(index => this.pointGrid.addPoint(points[index]));
    await counter.toPromise();
    this.currentStep = 2;
    await this.pointGrid.fillInGrid().toPromise();
    this.currentStep = 3;
    await this.pointGrid.markEdgeNodes().toPromise();
    this.currentStep = 4;
    this.winner = await this.pointGrid.findSolution().toPromise();
    this.currentStep = 5;
  }

  joiner(index, row) {
    return row.join();
  }

  id(index, cell) {
    return cell.id + cell.mark;
  }

  classes(cell: { id: string; mark: Marker }) {
    return {
      isIgnored: cell.mark === Marker.Ignore,
      isDiscarded: cell.mark === Marker.Discard,
      isSolution: cell.mark === Marker.Solution
    };
  }

  private getMarker(mark: Marker): string {
    switch (mark) {
      case Marker.Ignore:
        return '.';
      case Marker.Discard:
        return 'x';
      case Marker.Solution:
        return 'S';
      default:
        return '-';
    }
  }

  private setupDisplay() {
    const canvas = this.canvas.nativeElement;
    const pointWidth = 10;
    const pointHeight = 10;
    const dataWidth = this.pointGrid.width * pointWidth;
    const dataHeight = this.pointGrid.height * pointHeight;
    const canvasWidth = canvas.clientWidth;
    const scaling = canvasWidth / dataWidth;
    canvas.width = dataWidth * scaling;
    canvas.height = dataHeight * scaling;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.font = '10px monospace';
    ctx.textBaseline = 'hanging';
    ctx.scale(scaling, scaling);
    console.log(ctx);
    this.point$.subscribe(point => {
      ctx.clearRect(
        point.x * pointWidth - 1,
        point.y * pointHeight - 1,
        pointWidth - 2,
        pointHeight - 2
      );
      switch (point.mark) {
        case Marker.Ignore:
          ctx.fillStyle = 'grey';
          ctx.fillRect(
            point.x * pointWidth,
            point.y * pointHeight,
            pointWidth / 2,
            pointHeight / 2
          );
          break;
        case Marker.Discard:
          ctx.fillStyle = 'red';
          // ctx.fillRect((point.x) * pointWidth,
          //   (point.y) * pointHeight,
          //   pointWidth,
          //   pointHeight);
          ctx.fillText('X', point.x * pointWidth, point.y * pointHeight);
          break;
        case Marker.Solution:
          ctx.fillStyle = point.id;
          /*ctx.fillRect((point.x) * pointWidth + 1,
            (point.y) * pointHeight + 1,
            pointWidth - 2,
            pointHeight - 2);*/
          ctx.fillText('S', point.x * pointWidth, point.y * pointHeight);
          break;
        default:
          ctx.fillStyle = point.id;
          if (point.starting) {
            const minSquare = Math.min(pointWidth, pointHeight);
            const radius = minSquare / 2 - 1;
            ctx.beginPath();
            ctx.arc(
              point.x * pointWidth - 1 + radius,
              point.y * pointHeight - 1 + radius,
              radius,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            ctx.fillRect(
              point.x * pointWidth - 1,
              point.y * pointHeight - 1,
              pointWidth - 2,
              pointHeight - 2
            );
          }
      }
    });
  }

  private rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    /* tslint:disable:no-bitwise */
    let r, g, b;
    const h = step / numOfSteps;
    const i = ~~(h * 6);
    const f = h * 6 - i;
    const q = 1 - f;
    switch (i % 6) {
      case 0:
        r = 1;
        g = f;
        b = 0;
        break;
      case 1:
        r = q;
        g = 1;
        b = 0;
        break;
      case 2:
        r = 0;
        g = 1;
        b = f;
        break;
      case 3:
        r = 0;
        g = q;
        b = 1;
        break;
      case 4:
        r = f;
        g = 0;
        b = 1;
        break;
      case 5:
        r = 1;
        g = 0;
        b = q;
        break;
    }
    return (
      '#' +
      ('00' + (~~(r * 255)).toString(16)).slice(-2) +
      ('00' + (~~(g * 255)).toString(16)).slice(-2) +
      ('00' + (~~(b * 255)).toString(16)).slice(-2)
    );
    /* tslint:disable:no-bitwise */
  }
}
