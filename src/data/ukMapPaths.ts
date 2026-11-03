// Accurate geographic SVG boundary paths for UK ITL-1 standard statistical regions
// Calibrated to viewport: 0 0 600 780

export interface UKRegionSvgPath {
  id: string;
  name: string;
  path: string;
  labelX: number; // Center of region for label & percentage tag
  labelY: number;
}

export const UK_MAP_PATHS: UKRegionSvgPath[] = [
  {
    id: "Scotland",
    name: "Scotland",
    path: `M 285,45 
           C 295,30 325,25 340,40 
           C 350,55 355,80 345,100 
           C 340,110 365,115 375,130 
           C 385,150 375,175 355,185 
           C 350,195 330,210 315,225 
           C 305,235 290,240 270,240 
           C 255,240 235,220 225,200 
           C 215,180 205,150 215,120 
           C 225,95 240,70 260,55 Z
           M 205,95 C 190,110 185,135 195,150 C 200,140 210,120 205,95 Z
           M 380,30 C 390,20 405,25 400,40 C 390,45 380,40 380,30 Z`,
    labelX: 285,
    labelY: 130
  },
  {
    id: "Northern Ireland",
    name: "Northern Ireland",
    path: `M 95,245 
           C 115,230 145,230 160,240 
           C 175,250 180,270 170,285 
           C 165,295 145,305 130,300 
           C 110,295 90,280 85,265 
           C 85,255 90,250 95,245 Z`,
    labelX: 130,
    labelY: 268
  },
  {
    id: "North East",
    name: "North East",
    path: `M 315,225 
           C 335,225 350,230 360,245 
           C 370,265 375,285 365,305 
           C 355,305 340,300 330,290 
           C 320,275 315,255 310,240 
           C 310,230 312,225 315,225 Z`,
    labelX: 345,
    labelY: 265
  },
  {
    id: "North West",
    name: "North West",
    path: `M 270,240 
           C 290,240 310,240 315,255 
           C 320,270 325,295 315,315 
           C 310,335 305,355 295,365 
           C 285,370 265,370 255,360 
           C 245,345 240,320 250,300 
           C 255,280 260,255 270,240 Z`,
    labelX: 280,
    labelY: 305
  },
  {
    id: "Yorkshire and The Humber",
    name: "Yorkshire and The Humber",
    path: `M 330,290 
           C 350,295 370,300 380,315 
           C 395,335 400,360 385,380 
           C 370,390 350,390 335,385 
           C 320,380 310,365 315,345 
           C 320,325 325,305 330,290 Z`,
    labelX: 355,
    labelY: 340
  },
  {
    id: "West Midlands",
    name: "West Midlands",
    path: `M 255,360 
           C 275,365 295,365 305,375 
           C 315,385 315,410 305,430 
           C 295,445 275,455 260,450 
           C 245,440 235,420 240,395 
           C 245,375 250,365 255,360 Z`,
    labelX: 275,
    labelY: 410
  },
  {
    id: "East Midlands",
    name: "East Midlands",
    path: `M 315,345 
           C 335,350 360,355 375,370 
           C 385,385 385,410 375,425 
           C 360,435 340,435 325,430 
           C 315,420 310,395 310,375 
           C 310,360 312,350 315,345 Z`,
    labelX: 345,
    labelY: 395
  },
  {
    id: "Wales",
    name: "Wales",
    path: `M 215,335 
           C 235,330 245,345 240,370 
           C 235,395 240,430 230,455 
           C 220,470 195,475 175,465 
           C 160,450 150,425 160,395 
           C 170,370 185,355 200,340 
           C 205,335 210,335 215,335 Z`,
    labelX: 195,
    labelY: 410
  },
  {
    id: "East of England",
    name: "East of England",
    path: `M 375,370 
           C 395,370 425,380 445,400 
           C 460,420 455,445 440,465 
           C 425,475 400,475 385,465 
           C 375,450 370,430 375,405 
           C 375,390 375,380 375,370 Z`,
    labelX: 410,
    labelY: 430
  },
  {
    id: "London",
    name: "London",
    path: `M 365,470 
           C 380,465 395,465 405,472 
           C 415,480 410,495 400,505 
           C 385,510 370,505 362,495 
           C 358,485 360,475 365,470 Z`,
    labelX: 385,
    labelY: 488
  },
  {
    id: "South East",
    name: "South East",
    path: `M 325,470 
           C 345,460 365,460 375,470 
           C 390,465 415,465 435,480 
           C 455,500 450,525 430,545 
           C 405,555 370,555 340,540 
           C 315,530 305,505 315,485 
           C 320,475 322,470 325,470 Z`,
    labelX: 375,
    labelY: 525
  },
  {
    id: "South West",
    name: "South West",
    path: `M 245,465 
           C 275,460 305,470 315,490 
           C 315,515 295,535 270,545 
           C 240,555 200,570 165,585 
           C 135,595 110,600 100,590 
           C 95,580 115,565 140,545 
           C 170,525 210,495 245,465 Z`,
    labelX: 205,
    labelY: 535
  }
];
