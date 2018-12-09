import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { interval, range, Subject } from 'rxjs';
import { Area } from './area';
import { map, share, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-day03',
  templateUrl: './day03.component.html',
  styleUrls: ['./day03.component.scss']
})
export class Day03Component implements OnInit {
  challengeCtrl = new FormControl(
    '#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2',
    Validators.required
  );
  distanceInput = new FormControl('32', Validators.required);
  currentStep = 0;
  working = false;
  working2 = false;
  result;
  winner2;
  area$ = new Subject<Area>();
  intercept$ = new Subject<{ x: number; y: number }>();
  areas;
  @ViewChild('canvas') canvas: ElementRef;

  constructor() {}

  ngOnInit() {}

  loadChallenge() {
    this.challengeCtrl.setValue(`#1 @ 338,764: 20x24
#2 @ 80,667: 12x26
#3 @ 625,36: 17x22
#4 @ 196,235: 25x13
#5 @ 610,700: 25x21
#6 @ 590,831: 20x13
#7 @ 253,201: 29x22
#8 @ 921,577: 15x13
#9 @ 495,85: 20x19
#10 @ 397,589: 17x22
#11 @ 238,651: 13x17
#12 @ 143,939: 28x19
#13 @ 211,227: 26x12
#14 @ 81,818: 22x19
#15 @ 121,270: 18x10
#16 @ 414,117: 16x25
#17 @ 450,597: 11x13
#18 @ 875,694: 25x13
#19 @ 348,301: 19x14
#20 @ 427,302: 20x28
#21 @ 295,935: 29x22
#22 @ 488,347: 21x10
#23 @ 724,809: 24x24
#24 @ 529,746: 23x22
#25 @ 674,555: 29x17
#26 @ 807,871: 29x19
#27 @ 170,203: 11x13
#28 @ 340,446: 21x11
#29 @ 534,294: 28x17
#30 @ 136,271: 22x22
#31 @ 672,965: 29x10
#32 @ 767,638: 22x10
#33 @ 927,196: 11x23
#34 @ 349,305: 22x12
#35 @ 616,903: 27x22
#36 @ 761,453: 16x15
#37 @ 682,835: 26x20
#38 @ 799,723: 27x17
#39 @ 623,807: 21x20
#40 @ 334,886: 16x27
#41 @ 953,561: 15x28
#42 @ 318,469: 23x16
#43 @ 498,718: 16x12
#44 @ 634,788: 22x26
#45 @ 150,190: 13x28
#46 @ 814,124: 22x24
#47 @ 524,741: 20x26
#48 @ 931,336: 19x20
#49 @ 200,506: 14x20
#50 @ 849,225: 16x11
#51 @ 602,494: 19x20
#52 @ 362,128: 14x13
#53 @ 680,571: 19x19
#54 @ 354,45: 29x27
#55 @ 908,894: 10x27
#56 @ 204,219: 10x18
#57 @ 328,28: 11x28
#58 @ 604,789: 11x25
#59 @ 288,827: 29x15
#60 @ 945,443: 14x12
#61 @ 294,845: 8x8
#62 @ 756,365: 20x23
#63 @ 570,493: 17x14
#64 @ 144,372: 23x12
#65 @ 374,58: 13x19
#66 @ 331,305: 12x11
#67 @ 603,282: 19x19
#68 @ 755,875: 12x13
#69 @ 147,709: 26x10
#70 @ 445,408: 13x17
#71 @ 816,215: 24x13
#72 @ 28,225: 15x29
#73 @ 167,253: 10x25
#74 @ 788,845: 18x10
#75 @ 834,230: 26x24
#76 @ 874,277: 17x24
#77 @ 250,805: 11x24
#78 @ 267,610: 13x11
#79 @ 813,860: 24x20
#80 @ 119,585: 10x18
#81 @ 494,941: 12x25
#82 @ 816,550: 12x28
#83 @ 620,799: 17x12
#84 @ 705,754: 24x21
#85 @ 297,16: 15x21
#86 @ 650,808: 19x20
#87 @ 251,138: 20x15
#88 @ 834,516: 19x20
#89 @ 229,266: 24x13
#90 @ 524,827: 20x25
#91 @ 186,405: 20x28
#92 @ 448,795: 13x18
#93 @ 508,388: 25x27
#94 @ 74,831: 19x19
#95 @ 444,548: 12x22
#96 @ 893,230: 17x24
#97 @ 380,437: 14x25
#98 @ 511,272: 10x13
#99 @ 261,922: 12x23
#100 @ 215,120: 27x27
#101 @ 190,202: 23x29
#102 @ 954,691: 11x24
#103 @ 916,207: 17x29
#104 @ 441,890: 23x16
#105 @ 322,455: 11x22
#106 @ 28,0: 22x19
#107 @ 101,633: 19x24
#108 @ 214,399: 20x11
#109 @ 882,829: 25x11
#110 @ 336,33: 21x26
#111 @ 805,278: 13x21
#112 @ 98,522: 12x29
#113 @ 261,706: 25x26
#114 @ 706,369: 21x13
#115 @ 281,23: 23x12
#116 @ 505,410: 25x13
#117 @ 147,514: 12x12
#118 @ 555,888: 11x13
#119 @ 687,852: 22x25
#120 @ 46,609: 5x12
#121 @ 431,119: 24x13
#122 @ 843,984: 24x15
#123 @ 313,524: 25x12
#124 @ 213,231: 17x18
#125 @ 167,935: 21x11
#126 @ 719,738: 22x23
#127 @ 692,840: 29x13
#128 @ 948,580: 19x21
#129 @ 558,303: 14x14
#130 @ 890,328: 10x23
#131 @ 934,563: 23x12
#132 @ 757,18: 22x22
#133 @ 615,947: 21x20
#134 @ 712,439: 26x18
#135 @ 219,134: 28x28
#136 @ 373,270: 26x23
#137 @ 87,844: 29x13
#138 @ 937,454: 23x27
#139 @ 482,802: 23x14
#140 @ 687,970: 29x13
#141 @ 983,139: 12x20
#142 @ 268,656: 21x17
#143 @ 940,913: 18x20
#144 @ 328,588: 10x17
#145 @ 217,915: 23x21
#146 @ 92,841: 17x17
#147 @ 962,683: 24x17
#148 @ 857,468: 12x17
#149 @ 438,644: 20x10
#150 @ 516,283: 21x17
#151 @ 429,847: 24x29
#152 @ 761,679: 10x5
#153 @ 471,59: 26x12
#154 @ 223,650: 21x19
#155 @ 80,555: 25x18
#156 @ 455,328: 26x28
#157 @ 723,634: 27x11
#158 @ 565,862: 14x25
#159 @ 381,670: 23x16
#160 @ 293,838: 12x23
#161 @ 168,190: 25x24
#162 @ 91,18: 28x29
#163 @ 470,715: 29x24
#164 @ 124,216: 13x14
#165 @ 360,133: 25x10
#166 @ 983,145: 10x10
#167 @ 577,420: 15x10
#168 @ 297,949: 17x23
#169 @ 789,129: 29x27
#170 @ 545,711: 16x20
#171 @ 965,81: 20x23
#172 @ 944,584: 26x23
#173 @ 139,971: 16x12
#174 @ 453,561: 26x16
#175 @ 591,967: 11x24
#176 @ 130,552: 22x24
#177 @ 643,365: 18x10
#178 @ 205,830: 29x11
#179 @ 536,151: 12x28
#180 @ 771,455: 14x18
#181 @ 699,596: 13x23
#182 @ 964,498: 19x24
#183 @ 964,563: 17x26
#184 @ 760,627: 10x14
#185 @ 832,457: 18x25
#186 @ 274,661: 12x25
#187 @ 9,788: 26x15
#188 @ 548,689: 16x25
#189 @ 478,927: 19x21
#190 @ 598,127: 21x17
#191 @ 417,6: 19x15
#192 @ 891,495: 26x28
#193 @ 532,862: 23x16
#194 @ 340,579: 10x15
#195 @ 816,103: 10x17
#196 @ 646,394: 21x20
#197 @ 234,827: 22x12
#198 @ 658,954: 28x17
#199 @ 491,4: 24x27
#200 @ 467,411: 11x11
#201 @ 683,88: 16x26
#202 @ 717,124: 22x16
#203 @ 325,577: 13x16
#204 @ 545,852: 19x10
#205 @ 58,535: 13x20
#206 @ 483,57: 21x28
#207 @ 287,762: 27x14
#208 @ 990,223: 6x12
#209 @ 878,768: 17x21
#210 @ 800,761: 24x12
#211 @ 971,661: 16x15
#212 @ 290,296: 10x13
#213 @ 67,852: 11x16
#214 @ 303,627: 27x18
#215 @ 150,89: 22x27
#216 @ 336,535: 29x21
#217 @ 603,198: 26x21
#218 @ 145,263: 27x19
#219 @ 332,793: 29x19
#220 @ 326,738: 19x22
#221 @ 277,828: 12x25
#222 @ 227,729: 14x20
#223 @ 863,900: 10x21
#224 @ 914,2: 15x11
#225 @ 535,507: 14x14
#226 @ 91,144: 21x21
#227 @ 454,437: 29x19
#228 @ 878,506: 26x20
#229 @ 467,873: 23x25
#230 @ 899,36: 17x14
#231 @ 490,959: 25x20
#232 @ 482,830: 22x18
#233 @ 233,662: 19x19
#234 @ 429,33: 28x21
#235 @ 884,537: 25x22
#236 @ 636,135: 11x10
#237 @ 196,303: 27x27
#238 @ 801,301: 12x24
#239 @ 522,444: 29x13
#240 @ 737,417: 18x29
#241 @ 603,706: 19x17
#242 @ 792,51: 17x18
#243 @ 241,740: 15x27
#244 @ 383,767: 23x20
#245 @ 735,647: 25x25
#246 @ 863,880: 22x23
#247 @ 20,966: 29x16
#248 @ 538,425: 14x28
#249 @ 108,844: 19x15
#250 @ 384,201: 28x25
#251 @ 932,593: 13x14
#252 @ 282,535: 29x23
#253 @ 822,550: 14x15
#254 @ 190,231: 29x23
#255 @ 602,217: 12x24
#256 @ 97,259: 18x21
#257 @ 40,24: 11x12
#258 @ 147,206: 14x10
#259 @ 738,864: 29x23
#260 @ 42,3: 10x23
#261 @ 668,581: 25x17
#262 @ 452,664: 25x12
#263 @ 688,493: 13x11
#264 @ 324,309: 27x19
#265 @ 460,696: 17x13
#266 @ 354,943: 20x11
#267 @ 959,576: 22x14
#268 @ 637,848: 12x29
#269 @ 685,606: 16x11
#270 @ 294,503: 20x13
#271 @ 689,398: 19x10
#272 @ 791,114: 13x16
#273 @ 881,910: 24x12
#274 @ 598,625: 11x16
#275 @ 863,668: 28x25
#276 @ 677,97: 25x21
#277 @ 310,767: 12x10
#278 @ 226,589: 11x17
#279 @ 41,761: 18x12
#280 @ 632,82: 14x21
#281 @ 978,549: 14x10
#282 @ 153,25: 26x22
#283 @ 397,240: 14x18
#284 @ 614,883: 20x23
#285 @ 980,7: 13x27
#286 @ 58,158: 22x21
#287 @ 188,5: 14x26
#288 @ 941,152: 19x15
#289 @ 547,853: 12x28
#290 @ 292,612: 16x23
#291 @ 725,945: 13x10
#292 @ 886,244: 15x27
#293 @ 665,745: 25x20
#294 @ 621,835: 20x21
#295 @ 462,252: 19x20
#296 @ 150,769: 20x11
#297 @ 119,439: 10x11
#298 @ 902,497: 14x20
#299 @ 805,772: 20x15
#300 @ 495,553: 19x24
#301 @ 789,754: 12x22
#302 @ 501,798: 28x12
#303 @ 949,746: 21x17
#304 @ 204,462: 24x14
#305 @ 543,30: 21x25
#306 @ 135,652: 21x22
#307 @ 314,157: 26x15
#308 @ 481,970: 12x19
#309 @ 593,972: 6x6
#310 @ 597,71: 22x24
#311 @ 373,400: 13x19
#312 @ 113,482: 23x16
#313 @ 720,925: 17x13
#314 @ 967,659: 16x23
#315 @ 352,66: 26x20
#316 @ 289,375: 14x13
#317 @ 405,405: 14x10
#318 @ 688,962: 16x29
#319 @ 684,863: 25x14
#320 @ 530,906: 17x25
#321 @ 384,719: 12x26
#322 @ 984,198: 10x22
#323 @ 673,273: 11x18
#324 @ 662,328: 22x14
#325 @ 571,653: 25x22
#326 @ 432,12: 10x27
#327 @ 842,672: 22x14
#328 @ 691,52: 16x17
#329 @ 216,327: 22x10
#330 @ 942,508: 11x11
#331 @ 698,200: 27x14
#332 @ 123,480: 27x24
#333 @ 68,611: 27x21
#334 @ 660,468: 15x22
#335 @ 709,372: 5x6
#336 @ 431,405: 19x17
#337 @ 143,276: 29x15
#338 @ 21,224: 27x28
#339 @ 880,402: 17x29
#340 @ 598,928: 21x28
#341 @ 233,180: 17x14
#342 @ 875,815: 14x19
#343 @ 963,130: 24x24
#344 @ 690,604: 17x18
#345 @ 713,638: 14x22
#346 @ 776,41: 27x29
#347 @ 138,341: 13x28
#348 @ 896,88: 29x24
#349 @ 967,829: 12x25
#350 @ 820,618: 29x10
#351 @ 805,176: 18x14
#352 @ 715,813: 16x29
#353 @ 686,194: 26x23
#354 @ 615,271: 29x12
#355 @ 515,387: 16x12
#356 @ 22,763: 12x13
#357 @ 528,572: 26x12
#358 @ 359,477: 18x18
#359 @ 290,430: 26x23
#360 @ 296,18: 24x11
#361 @ 886,543: 18x5
#362 @ 251,134: 25x14
#363 @ 927,583: 22x15
#364 @ 865,454: 22x28
#365 @ 669,322: 11x21
#366 @ 429,777: 25x22
#367 @ 325,432: 21x21
#368 @ 132,554: 24x15
#369 @ 917,7: 20x25
#370 @ 175,932: 25x10
#371 @ 954,72: 15x19
#372 @ 574,198: 25x15
#373 @ 333,23: 14x10
#374 @ 134,572: 14x17
#375 @ 775,386: 21x26
#376 @ 906,668: 19x12
#377 @ 695,566: 19x15
#378 @ 950,662: 25x28
#379 @ 714,376: 18x18
#380 @ 928,899: 29x19
#381 @ 802,376: 24x22
#382 @ 369,787: 13x25
#383 @ 75,261: 29x26
#384 @ 562,883: 10x16
#385 @ 321,26: 11x14
#386 @ 631,265: 26x27
#387 @ 519,451: 17x28
#388 @ 62,159: 12x18
#389 @ 693,41: 28x28
#390 @ 933,632: 10x11
#391 @ 246,257: 14x11
#392 @ 183,504: 22x26
#393 @ 555,924: 17x26
#394 @ 828,867: 21x28
#395 @ 775,874: 27x17
#396 @ 475,557: 17x24
#397 @ 535,645: 16x16
#398 @ 650,767: 23x29
#399 @ 453,242: 25x16
#400 @ 481,436: 24x15
#401 @ 195,982: 22x10
#402 @ 458,807: 12x13
#403 @ 386,728: 4x7
#404 @ 476,486: 22x11
#405 @ 674,631: 11x21
#406 @ 20,981: 10x19
#407 @ 471,551: 14x15
#408 @ 610,84: 13x10
#409 @ 899,118: 25x23
#410 @ 719,705: 27x22
#411 @ 458,280: 14x15
#412 @ 327,436: 14x25
#413 @ 635,145: 19x12
#414 @ 967,574: 12x13
#415 @ 517,356: 21x10
#416 @ 719,723: 16x24
#417 @ 661,755: 11x17
#418 @ 310,902: 19x24
#419 @ 432,516: 12x25
#420 @ 695,693: 26x28
#421 @ 518,653: 28x28
#422 @ 869,514: 28x22
#423 @ 730,402: 24x13
#424 @ 412,550: 11x27
#425 @ 688,234: 25x11
#426 @ 663,819: 10x20
#427 @ 209,219: 10x21
#428 @ 369,699: 24x22
#429 @ 770,731: 15x29
#430 @ 291,723: 19x16
#431 @ 978,582: 20x27
#432 @ 489,481: 15x12
#433 @ 287,41: 15x25
#434 @ 2,908: 10x26
#435 @ 827,150: 23x25
#436 @ 30,635: 28x19
#437 @ 178,391: 14x29
#438 @ 657,168: 23x13
#439 @ 378,461: 10x15
#440 @ 325,30: 10x25
#441 @ 757,462: 21x12
#442 @ 704,135: 17x28
#443 @ 815,393: 25x11
#444 @ 367,733: 17x23
#445 @ 542,705: 12x13
#446 @ 346,907: 17x13
#447 @ 16,809: 28x24
#448 @ 800,255: 21x16
#449 @ 192,9: 4x17
#450 @ 387,514: 13x12
#451 @ 625,137: 24x13
#452 @ 339,746: 25x17
#453 @ 758,32: 10x20
#454 @ 955,716: 19x15
#455 @ 987,3: 10x12
#456 @ 661,821: 23x25
#457 @ 636,969: 11x14
#458 @ 697,908: 13x20
#459 @ 178,919: 20x14
#460 @ 167,951: 22x20
#461 @ 284,211: 5x11
#462 @ 5,820: 20x24
#463 @ 884,516: 18x28
#464 @ 811,174: 19x21
#465 @ 38,229: 11x28
#466 @ 160,203: 29x28
#467 @ 286,107: 16x17
#468 @ 336,30: 20x28
#469 @ 959,4: 15x10
#470 @ 374,812: 11x10
#471 @ 605,748: 13x27
#472 @ 126,578: 19x20
#473 @ 151,127: 26x20
#474 @ 680,150: 28x25
#475 @ 266,842: 14x26
#476 @ 602,292: 21x12
#477 @ 220,702: 24x22
#478 @ 49,19: 21x20
#479 @ 208,750: 23x14
#480 @ 328,410: 23x15
#481 @ 65,501: 25x16
#482 @ 411,409: 17x28
#483 @ 709,935: 16x10
#484 @ 915,218: 28x22
#485 @ 722,661: 11x16
#486 @ 579,329: 25x14
#487 @ 338,352: 21x22
#488 @ 351,0: 13x12
#489 @ 254,867: 13x29
#490 @ 569,249: 24x11
#491 @ 592,742: 11x18
#492 @ 26,234: 11x23
#493 @ 602,590: 16x13
#494 @ 311,415: 20x22
#495 @ 979,551: 13x25
#496 @ 15,950: 17x10
#497 @ 397,722: 10x10
#498 @ 468,797: 18x13
#499 @ 961,835: 15x26
#500 @ 965,696: 23x23
#501 @ 811,96: 19x10
#502 @ 60,966: 12x20
#503 @ 425,104: 27x20
#504 @ 221,913: 18x29
#505 @ 441,787: 10x12
#506 @ 225,740: 20x11
#507 @ 162,110: 13x14
#508 @ 680,88: 26x21
#509 @ 344,40: 28x17
#510 @ 779,13: 27x28
#511 @ 258,387: 28x26
#512 @ 90,55: 12x23
#513 @ 406,120: 15x26
#514 @ 618,460: 13x12
#515 @ 660,495: 14x20
#516 @ 680,102: 11x16
#517 @ 588,664: 17x26
#518 @ 350,682: 25x24
#519 @ 304,41: 11x18
#520 @ 601,294: 14x15
#521 @ 395,680: 10x27
#522 @ 599,318: 17x27
#523 @ 953,279: 10x24
#524 @ 935,893: 11x18
#525 @ 150,965: 13x11
#526 @ 575,652: 12x22
#527 @ 328,282: 26x27
#528 @ 960,581: 10x16
#529 @ 451,523: 28x29
#530 @ 249,929: 14x13
#531 @ 787,347: 10x18
#532 @ 728,940: 21x16
#533 @ 501,489: 15x27
#534 @ 956,85: 15x15
#535 @ 29,956: 28x13
#536 @ 508,4: 12x16
#537 @ 115,211: 20x19
#538 @ 889,341: 15x10
#539 @ 755,56: 25x16
#540 @ 409,587: 12x12
#541 @ 669,166: 20x10
#542 @ 633,143: 21x19
#543 @ 614,163: 12x14
#544 @ 302,832: 16x23
#545 @ 436,25: 11x23
#546 @ 129,173: 16x22
#547 @ 273,439: 29x11
#548 @ 313,114: 15x15
#549 @ 698,822: 12x18
#550 @ 223,645: 27x25
#551 @ 311,280: 10x21
#552 @ 937,841: 16x18
#553 @ 382,979: 16x12
#554 @ 405,279: 17x23
#555 @ 588,413: 14x20
#556 @ 849,948: 21x24
#557 @ 374,548: 22x16
#558 @ 535,573: 12x15
#559 @ 603,764: 10x29
#560 @ 888,8: 13x26
#561 @ 884,386: 22x16
#562 @ 442,536: 11x6
#563 @ 159,189: 26x12
#564 @ 296,368: 26x29
#565 @ 165,918: 11x23
#566 @ 91,229: 26x24
#567 @ 964,821: 17x12
#568 @ 192,859: 19x12
#569 @ 540,835: 28x10
#570 @ 884,663: 17x25
#571 @ 726,640: 12x29
#572 @ 884,337: 23x10
#573 @ 142,924: 16x22
#574 @ 954,756: 13x12
#575 @ 745,633: 29x15
#576 @ 198,937: 29x11
#577 @ 966,574: 14x26
#578 @ 183,211: 27x22
#579 @ 885,202: 23x11
#580 @ 929,460: 23x28
#581 @ 308,288: 10x25
#582 @ 272,104: 15x20
#583 @ 580,697: 28x23
#584 @ 558,862: 11x12
#585 @ 408,511: 28x21
#586 @ 523,926: 13x27
#587 @ 752,411: 26x17
#588 @ 457,418: 21x24
#589 @ 734,404: 4x8
#590 @ 857,839: 29x16
#591 @ 694,101: 11x15
#592 @ 382,250: 21x19
#593 @ 760,683: 4x4
#594 @ 900,917: 11x22
#595 @ 688,599: 11x21
#596 @ 616,423: 23x27
#597 @ 788,737: 23x27
#598 @ 222,762: 22x25
#599 @ 133,672: 29x17
#600 @ 191,212: 10x23
#601 @ 253,117: 26x16
#602 @ 288,644: 12x21
#603 @ 167,131: 20x24
#604 @ 888,535: 10x29
#605 @ 918,397: 20x11
#606 @ 897,934: 15x18
#607 @ 252,807: 6x17
#608 @ 614,495: 25x13
#609 @ 360,540: 24x26
#610 @ 705,192: 16x19
#611 @ 19,672: 15x19
#612 @ 173,227: 16x29
#613 @ 579,885: 23x15
#614 @ 497,390: 28x29
#615 @ 435,783: 24x20
#616 @ 337,492: 21x29
#617 @ 114,251: 16x22
#618 @ 917,820: 28x10
#619 @ 690,812: 25x18
#620 @ 63,138: 23x26
#621 @ 47,232: 20x11
#622 @ 497,408: 21x29
#623 @ 97,223: 26x10
#624 @ 751,558: 26x16
#625 @ 920,299: 13x26
#626 @ 0,249: 16x20
#627 @ 319,766: 14x19
#628 @ 967,520: 24x18
#629 @ 580,496: 11x28
#630 @ 185,960: 16x11
#631 @ 947,434: 13x23
#632 @ 712,447: 11x16
#633 @ 71,49: 15x15
#634 @ 58,962: 11x27
#635 @ 451,389: 19x27
#636 @ 280,665: 25x20
#637 @ 210,330: 28x14
#638 @ 221,269: 20x22
#639 @ 338,174: 11x10
#640 @ 36,747: 17x18
#641 @ 163,387: 24x19
#642 @ 273,244: 10x19
#643 @ 280,236: 15x23
#644 @ 475,964: 13x11
#645 @ 688,450: 11x26
#646 @ 913,291: 27x20
#647 @ 382,72: 13x12
#648 @ 939,641: 28x24
#649 @ 297,743: 11x23
#650 @ 247,168: 26x14
#651 @ 644,741: 22x26
#652 @ 99,220: 28x12
#653 @ 360,941: 17x21
#654 @ 285,550: 28x26
#655 @ 739,414: 21x14
#656 @ 434,973: 23x14
#657 @ 886,925: 11x28
#658 @ 451,670: 16x16
#659 @ 654,458: 24x18
#660 @ 35,594: 11x10
#661 @ 934,0: 15x26
#662 @ 39,90: 5x15
#663 @ 745,609: 25x22
#664 @ 357,329: 12x22
#665 @ 328,170: 27x19
#666 @ 661,130: 28x29
#667 @ 212,972: 20x12
#668 @ 788,881: 19x22
#669 @ 936,827: 14x13
#670 @ 785,426: 29x19
#671 @ 778,181: 28x14
#672 @ 326,115: 19x14
#673 @ 939,211: 19x24
#674 @ 844,866: 26x24
#675 @ 309,515: 15x25
#676 @ 351,787: 15x10
#677 @ 444,582: 22x11
#678 @ 285,719: 28x25
#679 @ 643,531: 26x21
#680 @ 671,204: 21x20
#681 @ 657,507: 17x28
#682 @ 335,678: 23x25
#683 @ 45,633: 16x13
#684 @ 522,437: 19x13
#685 @ 161,945: 28x15
#686 @ 510,507: 21x23
#687 @ 497,552: 18x22
#688 @ 788,847: 25x29
#689 @ 199,918: 19x13
#690 @ 339,373: 24x10
#691 @ 334,356: 3x7
#692 @ 293,226: 19x17
#693 @ 417,71: 28x12
#694 @ 74,54: 22x19
#695 @ 530,729: 25x17
#696 @ 227,259: 25x24
#697 @ 43,629: 12x16
#698 @ 58,526: 10x17
#699 @ 66,626: 23x21
#700 @ 714,799: 18x23
#701 @ 126,651: 10x10
#702 @ 398,698: 27x20
#703 @ 786,400: 15x16
#704 @ 361,840: 15x20
#705 @ 571,535: 18x29
#706 @ 442,319: 11x27
#707 @ 495,280: 19x21
#708 @ 91,854: 20x28
#709 @ 309,155: 17x17
#710 @ 9,235: 23x22
#711 @ 145,412: 20x19
#712 @ 598,331: 19x10
#713 @ 902,179: 25x28
#714 @ 315,574: 22x11
#715 @ 626,750: 18x27
#716 @ 894,416: 24x20
#717 @ 299,827: 23x20
#718 @ 301,814: 16x26
#719 @ 561,870: 25x24
#720 @ 607,483: 15x26
#721 @ 405,221: 25x20
#722 @ 845,237: 27x28
#723 @ 788,281: 28x10
#724 @ 790,99: 13x24
#725 @ 39,303: 27x13
#726 @ 837,232: 28x23
#727 @ 59,976: 27x22
#728 @ 313,836: 11x24
#729 @ 644,549: 11x19
#730 @ 961,206: 10x21
#731 @ 784,114: 28x14
#732 @ 482,60: 19x21
#733 @ 380,230: 19x12
#734 @ 17,224: 15x19
#735 @ 91,953: 29x13
#736 @ 957,485: 22x14
#737 @ 162,397: 27x19
#738 @ 696,569: 14x27
#739 @ 366,756: 15x18
#740 @ 604,921: 25x23
#741 @ 896,924: 27x25
#742 @ 168,486: 15x28
#743 @ 750,564: 13x18
#744 @ 642,304: 24x27
#745 @ 298,687: 10x26
#746 @ 397,710: 12x17
#747 @ 461,15: 26x24
#748 @ 927,334: 14x17
#749 @ 727,642: 17x12
#750 @ 426,236: 16x18
#751 @ 346,960: 29x27
#752 @ 478,870: 13x27
#753 @ 698,127: 24x28
#754 @ 119,921: 28x18
#755 @ 221,447: 24x17
#756 @ 229,682: 25x21
#757 @ 712,238: 21x26
#758 @ 594,577: 19x17
#759 @ 130,659: 28x18
#760 @ 65,25: 16x17
#761 @ 680,829: 12x17
#762 @ 213,125: 19x14
#763 @ 13,902: 12x26
#764 @ 520,454: 12x13
#765 @ 712,477: 23x27
#766 @ 670,265: 24x27
#767 @ 399,297: 17x23
#768 @ 83,964: 29x11
#769 @ 343,307: 14x26
#770 @ 633,146: 25x24
#771 @ 337,574: 26x15
#772 @ 794,234: 17x18
#773 @ 438,328: 24x26
#774 @ 762,765: 26x21
#775 @ 761,353: 25x19
#776 @ 824,614: 13x15
#777 @ 232,974: 12x19
#778 @ 156,121: 22x24
#779 @ 458,606: 21x23
#780 @ 370,959: 29x21
#781 @ 690,815: 25x27
#782 @ 865,918: 12x27
#783 @ 875,503: 13x17
#784 @ 592,794: 28x16
#785 @ 903,876: 19x23
#786 @ 8,796: 18x16
#787 @ 692,433: 11x21
#788 @ 735,509: 16x25
#789 @ 24,768: 26x26
#790 @ 725,457: 21x15
#791 @ 26,8: 21x18
#792 @ 557,728: 12x13
#793 @ 778,45: 10x23
#794 @ 381,220: 12x13
#795 @ 3,922: 29x25
#796 @ 706,197: 13x12
#797 @ 425,967: 17x29
#798 @ 666,764: 16x20
#799 @ 774,640: 10x14
#800 @ 581,310: 21x13
#801 @ 771,249: 24x16
#802 @ 772,36: 24x20
#803 @ 362,333: 17x19
#804 @ 803,861: 27x20
#805 @ 352,751: 25x28
#806 @ 880,770: 12x14
#807 @ 418,130: 25x27
#808 @ 601,292: 20x24
#809 @ 331,347: 10x25
#810 @ 181,929: 29x20
#811 @ 80,632: 27x23
#812 @ 4,136: 15x13
#813 @ 904,899: 13x24
#814 @ 61,828: 14x28
#815 @ 265,305: 28x18
#816 @ 753,32: 27x22
#817 @ 106,343: 26x20
#818 @ 655,323: 20x25
#819 @ 421,523: 16x15
#820 @ 143,251: 15x13
#821 @ 426,846: 15x26
#822 @ 705,144: 11x14
#823 @ 414,217: 16x22
#824 @ 368,399: 10x21
#825 @ 753,449: 24x10
#826 @ 452,396: 11x20
#827 @ 401,361: 11x25
#828 @ 483,320: 22x12
#829 @ 471,825: 17x28
#830 @ 816,250: 15x17
#831 @ 772,394: 29x17
#832 @ 922,400: 11x4
#833 @ 65,298: 18x11
#834 @ 613,805: 22x22
#835 @ 521,281: 29x12
#836 @ 333,852: 19x22
#837 @ 18,585: 26x17
#838 @ 150,34: 22x20
#839 @ 217,756: 27x21
#840 @ 36,88: 22x20
#841 @ 800,412: 12x27
#842 @ 202,911: 23x27
#843 @ 151,865: 16x25
#844 @ 929,817: 19x27
#845 @ 632,25: 14x29
#846 @ 125,256: 17x20
#847 @ 674,954: 20x29
#848 @ 106,362: 20x28
#849 @ 868,880: 27x29
#850 @ 635,9: 17x24
#851 @ 107,222: 17x27
#852 @ 805,889: 16x24
#853 @ 550,284: 14x18
#854 @ 441,642: 23x18
#855 @ 888,852: 24x25
#856 @ 161,224: 22x13
#857 @ 25,759: 11x17
#858 @ 683,916: 26x24
#859 @ 436,705: 28x22
#860 @ 615,429: 25x10
#861 @ 758,670: 16x21
#862 @ 376,472: 16x10
#863 @ 953,96: 17x20
#864 @ 118,678: 11x21
#865 @ 308,239: 17x19
#866 @ 314,581: 20x16
#867 @ 218,477: 24x11
#868 @ 229,100: 23x26
#869 @ 2,239: 15x23
#870 @ 589,356: 27x18
#871 @ 434,73: 7x7
#872 @ 988,221: 11x21
#873 @ 276,100: 19x27
#874 @ 625,766: 10x27
#875 @ 246,408: 17x26
#876 @ 973,521: 14x26
#877 @ 851,8: 27x22
#878 @ 624,32: 12x11
#879 @ 896,359: 26x28
#880 @ 317,923: 11x24
#881 @ 179,510: 21x14
#882 @ 143,742: 16x29
#883 @ 291,843: 27x13
#884 @ 170,901: 18x20
#885 @ 540,490: 17x12
#886 @ 216,964: 17x17
#887 @ 191,949: 19x15
#888 @ 682,648: 10x11
#889 @ 78,521: 24x12
#890 @ 19,679: 12x14
#891 @ 17,907: 20x11
#892 @ 489,837: 29x11
#893 @ 388,519: 27x10
#894 @ 588,53: 19x24
#895 @ 149,695: 28x27
#896 @ 150,364: 16x15
#897 @ 112,654: 20x21
#898 @ 709,465: 20x23
#899 @ 941,2: 26x10
#900 @ 542,90: 24x19
#901 @ 663,951: 18x29
#902 @ 244,515: 16x16
#903 @ 146,13: 25x25
#904 @ 499,36: 28x25
#905 @ 442,293: 20x14
#906 @ 351,855: 13x16
#907 @ 812,144: 27x28
#908 @ 505,21: 13x13
#909 @ 85,135: 14x14
#910 @ 185,145: 21x29
#911 @ 573,744: 29x24
#912 @ 726,763: 17x13
#913 @ 635,958: 10x14
#914 @ 395,337: 20x26
#915 @ 933,152: 14x26
#916 @ 315,549: 14x25
#917 @ 57,980: 28x13
#918 @ 427,974: 11x13
#919 @ 562,747: 25x25
#920 @ 514,290: 28x26
#921 @ 856,939: 25x18
#922 @ 686,692: 22x19
#923 @ 414,530: 27x22
#924 @ 949,281: 10x18
#925 @ 270,280: 20x22
#926 @ 474,348: 23x23
#927 @ 635,395: 20x19
#928 @ 105,430: 23x10
#929 @ 578,192: 26x12
#930 @ 506,482: 18x29
#931 @ 599,934: 22x11
#932 @ 746,193: 29x14
#933 @ 94,782: 18x27
#934 @ 24,226: 18x26
#935 @ 9,144: 16x24
#936 @ 290,633: 13x21
#937 @ 912,234: 17x24
#938 @ 354,518: 14x22
#939 @ 943,692: 29x27
#940 @ 867,134: 11x23
#941 @ 908,93: 10x15
#942 @ 174,400: 15x24
#943 @ 518,419: 29x17
#944 @ 460,770: 19x16
#945 @ 916,507: 22x29
#946 @ 251,165: 19x19
#947 @ 490,871: 10x29
#948 @ 220,589: 18x13
#949 @ 530,376: 10x15
#950 @ 307,31: 11x27
#951 @ 78,686: 11x27
#952 @ 950,464: 29x24
#953 @ 138,225: 29x27
#954 @ 281,294: 17x15
#955 @ 214,230: 16x22
#956 @ 929,513: 21x14
#957 @ 377,986: 12x11
#958 @ 282,200: 26x28
#959 @ 206,509: 23x28
#960 @ 528,451: 16x16
#961 @ 960,146: 13x12
#962 @ 255,378: 14x12
#963 @ 890,331: 29x11
#964 @ 216,692: 29x11
#965 @ 42,604: 20x24
#966 @ 710,371: 12x21
#967 @ 106,789: 27x21
#968 @ 693,480: 15x20
#969 @ 671,847: 16x11
#970 @ 345,839: 18x26
#971 @ 267,927: 27x17
#972 @ 954,214: 14x10
#973 @ 229,634: 10x27
#974 @ 264,389: 15x10
#975 @ 278,479: 19x26
#976 @ 299,756: 18x10
#977 @ 750,502: 18x29
#978 @ 317,549: 17x14
#979 @ 234,772: 18x16
#980 @ 855,937: 10x28
#981 @ 877,297: 20x11
#982 @ 234,752: 14x24
#983 @ 20,250: 27x11
#984 @ 869,830: 21x11
#985 @ 255,865: 15x20
#986 @ 907,216: 24x13
#987 @ 805,176: 27x14
#988 @ 786,354: 22x24
#989 @ 600,867: 22x26
#990 @ 121,270: 14x21
#991 @ 199,849: 19x25
#992 @ 842,593: 22x24
#993 @ 915,507: 27x20
#994 @ 583,821: 27x29
#995 @ 482,973: 14x26
#996 @ 147,588: 11x14
#997 @ 684,84: 21x25
#998 @ 772,112: 19x19
#999 @ 610,159: 22x22
#1000 @ 458,443: 19x17
#1001 @ 575,537: 8x20
#1002 @ 970,820: 12x28
#1003 @ 79,771: 20x28
#1004 @ 64,160: 11x25
#1005 @ 698,710: 23x14
#1006 @ 866,823: 22x23
#1007 @ 623,473: 26x26
#1008 @ 660,952: 15x21
#1009 @ 108,936: 12x14
#1010 @ 312,76: 13x13
#1011 @ 211,811: 22x27
#1012 @ 895,306: 21x10
#1013 @ 599,646: 12x24
#1014 @ 152,580: 10x11
#1015 @ 692,495: 19x28
#1016 @ 636,543: 17x10
#1017 @ 306,502: 25x28
#1018 @ 432,529: 25x17
#1019 @ 563,118: 27x23
#1020 @ 705,386: 24x21
#1021 @ 328,325: 22x29
#1022 @ 468,861: 12x19
#1023 @ 189,307: 13x15
#1024 @ 193,185: 20x18
#1025 @ 404,244: 29x18
#1026 @ 682,821: 12x21
#1027 @ 844,99: 27x29
#1028 @ 972,860: 10x12
#1029 @ 627,719: 15x14
#1030 @ 287,476: 12x11
#1031 @ 211,780: 15x28
#1032 @ 892,688: 12x13
#1033 @ 888,500: 12x17
#1034 @ 890,9: 29x17
#1035 @ 604,480: 23x17
#1036 @ 284,20: 14x24
#1037 @ 706,960: 24x18
#1038 @ 221,823: 16x22
#1039 @ 370,260: 19x17
#1040 @ 221,146: 21x27
#1041 @ 157,158: 22x19
#1042 @ 215,742: 16x17
#1043 @ 532,295: 27x20
#1044 @ 643,535: 29x24
#1045 @ 804,848: 28x12
#1046 @ 867,4: 29x28
#1047 @ 636,801: 10x27
#1048 @ 935,579: 29x21
#1049 @ 827,971: 27x19
#1050 @ 638,132: 29x27
#1051 @ 372,429: 17x17
#1052 @ 889,7: 23x25
#1053 @ 91,36: 19x24
#1054 @ 472,850: 19x27
#1055 @ 426,515: 14x19
#1056 @ 170,498: 12x10
#1057 @ 176,153: 10x18
#1058 @ 695,382: 26x24
#1059 @ 863,936: 10x16
#1060 @ 358,815: 21x15
#1061 @ 31,87: 25x29
#1062 @ 344,541: 17x25
#1063 @ 115,181: 17x17
#1064 @ 541,760: 17x25
#1065 @ 316,222: 14x24
#1066 @ 284,499: 29x10
#1067 @ 887,224: 17x20
#1068 @ 233,902: 24x21
#1069 @ 529,93: 19x10
#1070 @ 378,743: 12x16
#1071 @ 471,287: 28x26
#1072 @ 885,582: 24x13
#1073 @ 495,71: 27x25
#1074 @ 923,134: 19x16
#1075 @ 628,672: 13x27
#1076 @ 303,503: 12x24
#1077 @ 638,488: 26x12
#1078 @ 351,617: 10x25
#1079 @ 867,820: 15x18
#1080 @ 802,552: 21x13
#1081 @ 256,609: 17x15
#1082 @ 214,154: 24x12
#1083 @ 824,571: 19x13
#1084 @ 518,510: 25x11
#1085 @ 115,798: 23x27
#1086 @ 298,462: 18x29
#1087 @ 36,300: 16x24
#1088 @ 49,101: 26x20
#1089 @ 158,208: 23x15
#1090 @ 490,47: 14x14
#1091 @ 762,778: 12x16
#1092 @ 858,147: 16x25
#1093 @ 53,491: 19x22
#1094 @ 848,101: 19x20
#1095 @ 847,465: 11x21
#1096 @ 376,682: 19x23
#1097 @ 241,221: 13x19
#1098 @ 545,922: 29x11
#1099 @ 470,321: 25x12
#1100 @ 381,397: 22x21
#1101 @ 226,396: 12x15
#1102 @ 79,10: 12x27
#1103 @ 128,559: 18x11
#1104 @ 165,149: 12x28
#1105 @ 806,207: 16x21
#1106 @ 289,928: 10x17
#1107 @ 754,201: 22x21
#1108 @ 318,401: 16x18
#1109 @ 594,751: 15x29
#1110 @ 307,57: 10x26
#1111 @ 370,755: 14x19
#1112 @ 927,295: 27x15
#1113 @ 772,733: 29x29
#1114 @ 889,916: 15x17
#1115 @ 442,898: 10x19
#1116 @ 856,613: 12x10
#1117 @ 961,663: 24x29
#1118 @ 512,500: 24x21
#1119 @ 974,376: 14x24
#1120 @ 907,221: 10x17
#1121 @ 518,404: 23x15
#1122 @ 880,256: 10x20
#1123 @ 676,838: 17x10
#1124 @ 528,515: 19x18
#1125 @ 919,656: 19x29
#1126 @ 734,172: 13x11
#1127 @ 425,247: 29x12
#1128 @ 281,20: 23x16
#1129 @ 631,663: 14x17
#1130 @ 908,28: 15x13
#1131 @ 93,853: 11x24
#1132 @ 423,971: 25x23
#1133 @ 187,932: 14x25
#1134 @ 431,575: 27x15
#1135 @ 674,491: 27x16
#1136 @ 546,861: 22x15
#1137 @ 287,236: 17x15
#1138 @ 270,653: 21x25
#1139 @ 969,389: 25x20
#1140 @ 156,32: 20x16
#1141 @ 111,663: 27x16
#1142 @ 654,747: 17x25
#1143 @ 95,848: 22x11
#1144 @ 771,589: 27x25
#1145 @ 446,779: 15x13
#1146 @ 329,786: 26x29
#1147 @ 312,4: 17x15
#1148 @ 785,297: 17x24
#1149 @ 814,112: 20x18
#1150 @ 621,450: 12x24
#1151 @ 158,866: 19x10
#1152 @ 890,85: 28x23
#1153 @ 812,514: 27x13
#1154 @ 48,297: 26x19
#1155 @ 297,480: 18x27
#1156 @ 60,629: 10x25
#1157 @ 960,805: 14x20
#1158 @ 606,923: 23x27
#1159 @ 309,765: 19x18
#1160 @ 345,5: 11x24
#1161 @ 593,54: 26x19
#1162 @ 591,128: 26x24
#1163 @ 364,713: 19x17
#1164 @ 351,618: 21x11
#1165 @ 125,644: 15x14
#1166 @ 531,498: 13x24
#1167 @ 967,76: 28x19
#1168 @ 975,79: 10x14
#1169 @ 834,880: 14x20
#1170 @ 567,224: 12x26
#1171 @ 660,349: 10x20
#1172 @ 314,4: 14x10
#1173 @ 287,718: 16x14
#1174 @ 776,773: 18x16
#1175 @ 305,395: 19x23
#1176 @ 29,227: 26x27
#1177 @ 132,353: 20x25
#1178 @ 85,559: 13x5
#1179 @ 361,65: 16x16
#1180 @ 492,3: 29x21
#1181 @ 557,765: 23x14
#1182 @ 796,45: 18x10
#1183 @ 767,603: 26x27
#1184 @ 961,466: 22x16
#1185 @ 542,165: 21x23
#1186 @ 688,218: 15x14
#1187 @ 483,33: 17x22
#1188 @ 903,219: 22x22
#1189 @ 449,114: 11x28
#1190 @ 846,528: 12x18
#1191 @ 684,591: 19x17
#1192 @ 559,128: 15x23
#1193 @ 874,234: 22x18
#1194 @ 226,185: 15x29
#1195 @ 616,982: 25x15
#1196 @ 508,441: 24x26
#1197 @ 225,496: 27x25
#1198 @ 425,553: 29x22
#1199 @ 232,487: 21x13
#1200 @ 213,826: 15x12
#1201 @ 643,819: 13x24
#1202 @ 515,485: 19x28
#1203 @ 559,19: 22x14
#1204 @ 367,478: 12x23
#1205 @ 367,397: 28x22
#1206 @ 192,930: 15x10
#1207 @ 912,607: 28x29
#1208 @ 637,92: 20x22
#1209 @ 331,322: 21x29
#1210 @ 869,680: 26x20
#1211 @ 369,799: 10x11
#1212 @ 708,382: 18x19
#1213 @ 33,7: 26x28
#1214 @ 751,669: 28x22
#1215 @ 222,640: 21x24
#1216 @ 322,400: 28x12
#1217 @ 35,741: 20x11
#1218 @ 587,371: 22x24
#1219 @ 726,654: 22x14
#1220 @ 589,629: 24x15
#1221 @ 304,674: 20x22
#1222 @ 197,153: 22x27
#1223 @ 804,131: 26x24
#1224 @ 547,894: 17x18
#1225 @ 742,469: 20x17
#1226 @ 860,592: 29x23
#1227 @ 834,542: 18x26
#1228 @ 739,174: 3x4
#1229 @ 956,920: 24x16
#1230 @ 191,787: 27x29
#1231 @ 958,186: 10x27
#1232 @ 113,19: 21x17
#1233 @ 975,185: 10x17
#1234 @ 488,19: 23x21
#1235 @ 890,74: 13x29
#1236 @ 145,523: 23x11
#1237 @ 245,671: 18x23`);
    this.distanceInput.setValue(10000);
  }

  async startAlgorithm() {
    this.challengeCtrl.disable();
    this.working = true;
    this.currentStep = 1;
    const lines = this.challengeCtrl.value.split('\n');
    this.areas = lines.map((line, index) => {
      const data = line
        .trim()
        .split('@')[1]
        .trim()
        .split(':');
      const [x, y] = data[0]
        .split(',')
        .map(coord => parseInt(coord.trim(), 10));
      const [w, h] = data[1].split('x').map(attr => parseInt(attr.trim(), 10));
      return new Area(x, y, w, h, this.rainbow(lines.length, index));
    });
    const width = Math.max(...this.areas.map(a => a.xEnd));
    const height = Math.max(...this.areas.map(a => a.yEnd));
    this.setupDisplay(width, height);
    this.currentStep = 2;
    const counter = interval(0).pipe(
      take(lines.length),
      share()
    );
    counter.subscribe(index => {
      this.area$.next(this.areas[index]);
    });
    await counter.toPromise();
    this.currentStep = 3;
    const intercepts = new Set();
    range(0, width)
      .pipe(switchMap(x => range(0, height).pipe(map(y => [x, y]))))
      .subscribe(([x, y]) => {
        const claims = this.areas.filter(
          area => area.x <= x && x < area.xEnd && area.y <= y && y < area.yEnd
        ).length;
        if (claims >= 2) {
          intercepts.add({ x, y });
        }
      });
    this.currentStep = 4;
    const iArray = Array.from(intercepts);
    const drawer = interval(0).pipe(
      take(iArray.length),
      share()
    );
    drawer.subscribe(index => {
      this.intercept$.next(iArray[index]);
    });
    this.result = iArray.length;
    this.currentStep = 5;
  }

  private setupDisplay(width, height) {
    const canvas = this.canvas.nativeElement;
    const pointWidth = 10;
    const pointHeight = 10;
    const dataWidth = width * pointWidth;
    const dataHeight = height * pointHeight;
    const canvasWidth = canvas.clientWidth;
    const scaling = Math.min(2, canvasWidth / dataWidth);
    console.log(scaling);
    canvas.width = dataWidth * scaling;
    canvas.style.width = dataWidth * scaling + 'px';
    canvas.height = dataHeight * scaling;
    canvas.style.height = dataHeight * scaling + 'px';
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.font = '12px monospace';
    ctx.textBaseline = 'hanging';
    ctx.scale(scaling, scaling);
    ctx.globalAlpha = 0.5;
    this.area$.subscribe(area => {
      ctx.fillStyle = area.id;
      ctx.fillRect(
        area.x * pointWidth,
        area.y * pointHeight,
        area.width * pointWidth,
        area.height * pointHeight
      );
    });
    this.intercept$.subscribe(point => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'white';
      ctx.fillText('X', point.x * pointWidth, point.y * pointHeight);
    });
  }

  private rainbow(numOfSteps, step) {
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