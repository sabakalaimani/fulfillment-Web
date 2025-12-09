import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { MapPin, Truck, Warehouse, Snowflake, Zap, Globe, ArrowRight, CheckCircle2, Package } from 'lucide-react';

// --- Assets & Data ---

// A simplified silhouette of the US for the background
const US_MAP_PATH = "M 22.8,247.5 C 22.8,247.5 22.8,247.5 22.8,247.5 L 22.8,247.5 L 22.8,247.5 Z M 916.6,236.8 L 914.7,232.8 L 915.1,231.6 L 912.7,228.0 L 908.8,229.1 L 907.4,228.3 L 904.1,230.2 L 901.4,229.8 L 894.6,224.8 L 891.6,229.0 L 889.4,228.2 L 885.2,230.5 L 882.3,227.6 L 879.1,228.2 L 877.6,233.1 L 877.8,236.1 L 874.8,239.8 L 873.9,243.8 L 874.6,246.9 L 872.0,247.2 L 869.6,252.6 L 871.7,256.0 L 873.0,263.6 L 875.9,266.0 L 873.6,270.4 L 875.0,274.6 L 873.9,277.4 L 870.6,279.8 L 867.8,278.9 L 866.0,281.7 L 868.0,283.0 L 866.6,286.2 L 863.6,287.8 L 862.2,291.1 L 860.0,292.0 L 860.2,295.1 L 857.1,297.0 L 856.9,299.3 L 855.1,300.7 L 854.6,304.6 L 856.2,309.2 L 854.8,311.0 L 855.0,315.4 L 852.9,316.6 L 853.1,318.5 L 849.0,319.0 L 848.4,321.2 L 850.7,323.1 L 848.9,328.1 L 844.1,329.6 L 843.3,332.8 L 840.5,333.6 L 840.2,339.5 L 842.9,344.3 L 841.1,348.4 L 844.4,353.3 L 847.9,354.0 L 849.0,357.2 L 847.5,361.9 L 849.5,363.9 L 849.8,368.0 L 853.8,370.8 L 853.0,374.6 L 849.9,376.4 L 849.1,380.5 L 851.6,385.2 L 851.8,389.1 L 850.0,392.4 L 851.8,393.6 L 851.4,397.0 L 853.1,399.5 L 852.6,402.8 L 855.4,406.4 L 856.7,411.2 L 854.6,412.9 L 854.0,418.0 L 857.4,420.9 L 858.8,424.3 L 858.6,430.3 L 856.7,432.2 L 852.9,431.6 L 849.0,429.4 L 846.3,431.2 L 841.9,431.3 L 840.7,433.3 L 836.7,430.5 L 833.6,432.0 L 831.7,431.2 L 827.4,433.8 L 825.2,432.8 L 822.9,434.9 L 819.1,433.4 L 815.3,434.6 L 812.1,432.9 L 809.4,434.7 L 804.0,433.8 L 800.4,434.8 L 796.2,433.0 L 794.4,433.4 L 791.5,430.5 L 787.7,431.3 L 785.6,434.9 L 783.5,433.6 L 781.0,435.7 L 775.0,433.2 L 769.4,433.5 L 764.2,431.7 L 763.3,429.6 L 758.5,430.5 L 756.4,429.2 L 755.2,430.7 L 747.5,430.0 L 744.8,428.2 L 742.7,431.0 L 739.7,428.4 L 737.9,428.8 L 735.5,426.9 L 730.8,428.3 L 728.3,427.6 L 727.6,429.6 L 722.4,430.8 L 718.8,428.8 L 710.9,431.4 L 705.4,430.8 L 701.2,428.5 L 695.8,428.2 L 693.4,424.7 L 688.7,425.0 L 685.9,422.4 L 684.8,423.4 L 681.4,422.4 L 674.9,424.6 L 672.1,422.6 L 668.9,423.5 L 664.1,421.2 L 661.5,421.8 L 659.3,420.2 L 656.7,419.0 L 654.4,420.9 L 651.9,420.7 L 649.4,418.5 L 643.9,420.2 L 641.4,418.8 L 638.4,421.1 L 636.1,420.6 L 633.6,422.5 L 630.2,421.7 L 627.4,422.4 L 624.7,421.7 L 622.4,423.0 L 619.6,421.5 L 616.2,421.8 L 613.4,419.8 L 610.9,421.3 L 609.6,417.7 L 604.5,416.1 L 600.6,416.4 L 597.3,414.8 L 593.8,415.3 L 591.2,414.0 L 589.4,415.3 L 589.1,412.8 L 585.9,411.2 L 584.5,413.0 L 581.2,412.1 L 579.0,410.3 L 577.9,411.8 L 574.0,411.6 L 571.2,409.1 L 569.4,410.0 L 566.0,408.1 L 563.3,408.4 L 560.8,406.6 L 559.9,408.1 L 556.3,407.5 L 553.8,405.6 L 552.0,406.1 L 549.8,404.3 L 546.7,404.8 L 543.7,402.5 L 541.5,404.3 L 539.7,403.4 L 539.3,405.7 L 536.5,405.5 L 535.2,403.7 L 529.8,405.0 L 527.9,403.5 L 524.0,404.5 L 521.3,403.2 L 519.1,403.7 L 516.4,401.8 L 512.6,403.3 L 511.9,401.6 L 508.1,401.9 L 504.7,400.2 L 502.8,401.8 L 499.7,400.9 L 497.5,402.1 L 495.2,401.1 L 492.2,402.6 L 490.3,401.4 L 487.8,402.3 L 485.9,401.1 L 484.1,401.9 L 482.9,400.5 L 482.3,401.6 L 479.9,401.5 L 477.6,400.0 L 475.2,400.8 L 471.6,400.6 L 469.7,398.7 L 466.8,399.7 L 463.3,398.8 L 461.4,399.2 L 459.7,397.6 L 457.1,398.9 L 454.4,397.4 L 452.9,398.7 L 450.4,398.6 L 447.8,399.5 L 446.4,398.2 L 443.2,398.9 L 440.0,398.0 L 439.0,398.7 L 436.3,397.7 L 433.8,398.6 L 431.9,397.2 L 428.1,397.5 L 425.9,396.1 L 423.8,397.4 L 422.1,396.6 L 420.0,398.0 L 417.8,396.9 L 413.7,398.2 L 413.5,400.8 L 410.6,400.8 L 409.2,403.3 L 406.8,402.6 L 405.7,405.6 L 402.2,405.0 L 399.7,406.2 L 397.0,404.9 L 392.2,407.0 L 388.9,405.8 L 384.9,407.4 L 381.1,406.5 L 377.3,409.4 L 372.9,407.9 L 371.4,410.5 L 366.1,408.8 L 362.8,410.3 L 358.3,409.2 L 354.2,410.9 L 352.0,413.1 L 349.5,413.0 L 348.6,415.8 L 344.2,415.8 L 341.6,417.8 L 339.4,416.7 L 336.9,418.9 L 331.4,417.7 L 329.8,416.5 L 327.9,418.5 L 324.9,417.8 L 324.2,419.6 L 319.5,419.4 L 316.5,417.9 L 314.9,420.5 L 313.3,422.3 L 309.8,421.2 L 305.5,423.5 L 302.2,423.8 L 297.8,422.1 L 297.8,420.3 L 292.0,418.9 L 292.3,424.3 L 290.3,426.0 L 290.3,436.3 L 295.3,441.9 L 297.8,452.2 L 293.7,458.7 L 285.4,465.3 L 282.8,464.9 L 282.6,462.6 L 278.4,458.0 L 273.7,460.6 L 272.9,458.5 L 269.9,455.5 L 270.7,452.8 L 266.8,451.9 L 262.1,452.6 L 255.4,450.4 L 244.9,436.0 L 236.4,429.3 L 235.3,425.2 L 238.1,418.9 L 243.6,414.7 L 247.7,406.9 L 247.9,396.1 L 246.3,388.9 L 242.0,381.1 L 237.1,374.3 L 233.1,364.7 L 227.1,357.7 L 222.8,354.8 L 219.7,350.2 L 217.7,341.4 L 213.9,335.5 L 208.6,328.7 L 204.4,324.6 L 199.1,320.1 L 197.8,316.3 L 191.0,314.9 L 187.9,311.9 L 186.2,305.3 L 182.2,298.6 L 176.6,290.3 L 172.1,286.0 L 165.7,281.8 L 160.0,277.6 L 157.6,274.6 L 152.0,268.9 L 145.4,263.6 L 138.6,259.6 L 131.8,255.5 L 122.9,252.6 L 115.9,251.6 L 110.4,250.7 L 105.7,249.7 L 100.2,248.8 L 94.7,247.4 L 91.2,243.2 L 85.9,235.4 L 81.3,227.6 L 77.2,217.4 L 74.3,205.8 L 72.8,197.6 L 72.8,192.8 L 73.1,189.9 L 68.6,183.0 L 61.2,176.6 L 56.4,174.6 L 49.6,173.3 L 41.6,172.9 L 34.2,171.7 L 27.2,170.8 L 23.9,165.3 L 22.3,158.4 L 22.8,150.8 L 26.6,143.2 L 30.6,134.7 L 34.6,126.8 L 38.0,119.5 L 43.1,113.8 L 50.3,110.0 L 58.7,106.9 L 67.2,106.8 L 73.9,105.9 L 79.5,102.7 L 84.3,95.7 L 85.6,89.5 L 85.1,84.4 L 83.1,79.8 L 79.8,76.5 L 75.3,73.5 L 73.0,69.5 L 74.3,64.7 L 78.4,60.5 L 82.5,58.8 L 88.0,59.3 L 93.3,60.8 L 96.6,64.5 L 101.4,66.1 L 105.5,65.8 L 107.8,63.1 L 107.9,59.6 L 106.9,56.1 L 109.1,53.2 L 114.1,52.2 L 118.8,53.5 L 121.2,56.9 L 122.4,61.9 L 126.5,63.3 L 131.6,63.1 L 133.7,60.3 L 135.2,57.0 L 139.7,56.1 L 143.7,57.5 L 145.4,61.1 L 145.6,65.8 L 148.9,67.3 L 153.2,65.8 L 155.0,63.1 L 155.5,60.5 L 160.0,59.2 L 164.7,59.5 L 167.9,61.3 L 170.1,64.7 L 171.4,70.2 L 174.6,71.2 L 178.6,70.4 L 180.7,67.6 L 182.2,64.1 L 186.0,61.6 L 189.6,62.1 L 192.5,64.2 L 193.3,68.7 L 196.5,70.5 L 200.2,70.0 L 203.0,68.2 L 205.5,64.7 L 210.1,64.3 L 213.9,65.6 L 215.9,68.7 L 216.7,72.7 L 219.7,74.2 L 224.2,73.6 L 226.7,71.2 L 228.3,66.7 L 233.1,65.6 L 237.9,66.5 L 240.2,69.5 L 240.7,73.7 L 244.2,75.7 L 248.8,75.2 L 251.7,72.9 L 253.9,68.9 L 258.9,68.1 L 263.3,69.5 L 265.4,72.4 L 265.6,76.5 L 268.4,79.0 L 273.1,79.5 L 276.9,77.7 L 278.4,74.4 L 282.7,72.7 L 287.9,73.3 L 290.4,75.6 L 291.5,79.1 L 295.1,80.7 L 299.7,80.2 L 302.7,77.9 L 305.1,74.1 L 310.2,72.9 L 314.9,73.7 L 317.4,76.4 L 318.1,80.1 L 321.4,81.9 L 326.2,81.6 L 329.5,79.1 L 331.7,75.6 L 336.5,74.4 L 341.2,75.2 L 344.0,77.9 L 344.9,81.7 L 348.6,83.1 L 352.7,82.4 L 355.6,79.9 L 357.2,76.3 L 361.9,74.7 L 366.4,75.5 L 369.3,77.7 L 370.2,81.5 L 373.9,82.9 L 378.1,81.8 L 380.9,79.3 L 382.4,75.6 L 387.0,74.0 L 391.7,74.5 L 394.5,76.6 L 395.7,80.2 L 399.5,81.3 L 403.4,79.9 L 405.8,77.1 L 407.4,73.1 L 412.3,71.5 L 416.7,72.0 L 419.6,74.2 L 420.9,77.7 L 425.2,78.5 L 429.2,77.1 L 431.5,74.0 L 432.7,70.5 L 437.4,68.6 L 442.2,68.6 L 445.6,70.4 L 447.1,73.6 L 451.8,74.1 L 455.5,72.0 L 458.1,68.7 L 459.1,64.3 L 463.3,62.1 L 467.9,61.9 L 471.1,63.5 L 472.9,66.6 L 477.5,66.7 L 481.5,64.7 L 483.7,61.3 L 484.7,56.8 L 488.7,54.6 L 493.5,54.2 L 496.7,55.7 L 498.4,59.0 L 503.2,59.3 L 506.8,57.1 L 509.3,53.8 L 510.3,49.2 L 514.8,47.1 L 519.2,47.1 L 522.6,48.5 L 524.2,51.8 L 529.1,52.2 L 532.7,50.3 L 535.1,46.8 L 536.0,42.4 L 540.2,40.1 L 544.7,40.0 L 548.1,41.4 L 549.9,44.5 L 554.4,45.3 L 558.1,43.4 L 560.8,40.3 L 562.0,36.1 L 566.2,34.0 L 570.6,33.8 L 573.9,35.2 L 575.5,38.1 L 580.4,38.5 L 584.0,36.5 L 586.3,33.0 L 587.2,28.5 L 591.6,26.5 L 596.1,26.5 L 599.5,27.9 L 601.2,30.9 L 606.0,31.7 L 609.7,29.9 L 612.4,26.6 L 613.4,22.3 L 617.9,20.3 L 622.3,20.6 L 625.6,22.0 L 627.1,25.2 L 631.9,26.2 L 635.8,24.4 L 638.3,21.3 L 639.2,16.8 L 643.5,14.6 L 648.1,14.6 L 651.5,15.9 L 653.2,19.0 L 658.1,20.0 L 661.7,18.0 L 664.3,14.7 L 665.4,10.2 L 670.3,7.9 L 674.8,8.2 L 678.0,9.9 L 679.7,13.1 L 684.3,14.4 L 688.3,12.7 L 690.9,9.8 L 691.8,5.5 L 696.5,3.3 L 701.3,3.7 L 704.5,5.6 L 705.8,8.9 L 710.2,10.4 L 714.4,9.0 L 717.3,6.2 L 718.5,1.9 L 723.3,-0.1 L 728.1,0.5 L 731.4,2.5 L 732.6,5.8 L 736.8,7.6 L 741.0,6.5 L 744.1,3.8 L 745.5,-0.5 L 750.3,-2.3 L 755.2,-1.5 L 758.3,0.7 L 759.5,3.9 L 763.5,5.9 L 767.9,5.0 L 771.2,2.5 L 772.5,-1.9 L 777.6,-3.4 L 782.1,-2.4 L 785.4,0.1 L 786.6,3.4 L 790.2,5.5 L 794.6,5.0 L 798.1,2.7 L 799.4,-1.8 L 804.1,-3.2 L 808.8,-2.0 L 811.8,0.7 L 812.8,3.9 L 816.1,5.8 L 820.6,5.2 L 824.1,2.8 L 825.4,-1.5 L 829.9,-2.8 L 834.7,-1.5 L 837.7,1.2 L 838.7,4.5 L 841.9,6.5 L 846.5,6.1 L 849.8,3.7 L 851.3,-0.6 L 855.9,-1.7 L 860.6,-0.3 L 863.6,2.5 L 864.5,5.9 L 867.7,7.8 L 872.2,7.3 L 875.5,4.9 L 877.0,0.6 L 881.6,-0.4 L 886.4,1.1 L 889.2,4.0 L 890.1,7.2 L 893.4,9.1 L 897.7,8.6 L 901.0,6.2 L 902.5,1.9 L 907.3,0.8 L 912.0,2.5 L 914.8,5.4 L 915.6,8.7 L 918.9,10.6 L 923.3,10.0 L 926.4,7.6 L 928.0,3.3 L 933.2,1.8 L 937.5,3.6 L 940.6,6.6 L 941.3,9.8 L 943.9,12.2 L 948.3,11.5 L 951.6,9.1 L 953.5,4.9 L 958.0,3.6 L 959.8,242.6 Z";

// --- Types ---
type Coordinate = { x: number; y: number };
type Hub = { id: string; name: string; city: string; coords: Coordinate };
type Spoke = { id: string; name: string; coords: Coordinate; hubId: string };

// --- Configuration ---
// Coordinates are roughly percentage based on the SVG viewBox "0 0 1000 600"
// These are manually tuned to align with the simplified map path above.

const WAREHOUSES: Hub[] = [
  { id: 'west', name: 'West Coast Hub', city: 'Watsonville, CA', coords: { x: 55, y: 250 } },
  { id: 'mid', name: 'Central Hub', city: 'Lancaster, TX', coords: { x: 490, y: 380 } },
  { id: 'east', name: 'East Coast Hub', city: 'Scranton, PA', coords: { x: 830, y: 180 } },
];

const SPOKES: Spoke[] = [
  // West Coast Spokes (Connecting to Watsonville)
  { id: 'sea', name: 'Seattle', coords: { x: 110, y: 30 }, hubId: 'west' },
  { id: 'pdx', name: 'Portland', coords: { x: 90, y: 60 }, hubId: 'west' },
  { id: 'sfo', name: 'San Francisco', coords: { x: 50, y: 210 }, hubId: 'west' }, // Adjusted closer to Watsonville
  { id: 'lax', name: 'Los Angeles', coords: { x: 100, y: 320 }, hubId: 'west' },
  { id: 'slc', name: 'Salt Lake City', coords: { x: 230, y: 200 }, hubId: 'west' },
  { id: 'phx', name: 'Phoenix', coords: { x: 200, y: 340 }, hubId: 'west' },

  // Midwest/Central Spokes (Connecting to Lancaster)
  { id: 'den', name: 'Denver', coords: { x: 330, y: 250 }, hubId: 'mid' },
  { id: 'dal', name: 'Dallas', coords: { x: 485, y: 375 }, hubId: 'mid' }, // Very close to Lancaster
  { id: 'hou', name: 'Houston', coords: { x: 500, y: 460 }, hubId: 'mid' },
  { id: 'msp', name: 'Minneapolis', coords: { x: 510, y: 110 }, hubId: 'mid' },
  { id: 'chi', name: 'Chicago', coords: { x: 600, y: 180 }, hubId: 'mid' },
  { id: 'stl', name: 'St. Louis', coords: { x: 560, y: 270 }, hubId: 'mid' },
  { id: 'nsh', name: 'Nashville', coords: { x: 630, y: 310 }, hubId: 'mid' },

  // East Coast Spokes (Connecting to Scranton)
  { id: 'nyc', name: 'New York', coords: { x: 860, y: 160 }, hubId: 'east' },
  { id: 'bos', name: 'Boston', coords: { x: 890, y: 130 }, hubId: 'east' },
  { id: 'was', name: 'Washington DC', coords: { x: 820, y: 220 }, hubId: 'east' },
  { id: 'clt', name: 'Charlotte', coords: { x: 770, y: 300 }, hubId: 'east' },
  { id: 'atl', name: 'Atlanta', coords: { x: 700, y: 350 }, hubId: 'east' },
  { id: 'mia', name: 'Miami', coords: { x: 790, y: 530 }, hubId: 'east' },
  { id: 'det', name: 'Detroit', coords: { x: 680, y: 170 }, hubId: 'east' },
];

const FEATURES = [
  {
    title: "2-Day Ground Shipping",
    desc: "Reach 98% of the US population within 2 days via affordable ground shipping.",
    icon: <Truck className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Cold Chain Experts",
    desc: "Specialized facilities for frozen and refrigerated goods. Dry ice optimization included.",
    icon: <Snowflake className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Eco-Friendly Packaging",
    desc: "100% recyclable and compostable insulation options to reduce your carbon footprint.",
    icon: <Globe className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Tech Integration",
    desc: "Seamlessly integrates with Shopify and other major e-commerce platforms.",
    icon: <Zap className="w-6 h-6 text-blue-400" />
  }
];

// --- Helper Components ---

const MapCurve: React.FC<{ start: Coordinate; end: Coordinate; active: boolean }> = ({ start, end, active }) => {
  // Calculate a control point for a quadratic bezier curve to give it a nice arc
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  // Offset the control point perpendicular to the line to create a curve
  // Simple logic: raise the curve slightly upward (negative y)
  const cpX = midX;
  const cpY = midY - 30; 

  const path = `M ${start.x},${start.y} Q ${cpX},${cpY} ${end.x},${end.y}`;

  return (
    <>
       {/* Shadow/Outline line for visibility */}
      <path
        d={path}
        fill="none"
        stroke={active ? "rgba(59, 130, 246, 0.2)" : "transparent"}
        strokeWidth="4"
        className="transition-all duration-500"
      />
      {/* Main Line */}
      <path
        d={path}
        fill="none"
        stroke={active ? "#60A5FA" : "#334155"} // Blue-400 if active, Slate-700 if not
        strokeWidth={active ? "2" : "1"}
        strokeDasharray={active ? "none" : "4,4"}
        className="transition-all duration-500"
        opacity={active ? 1 : 0.3}
      />
    </>
  );
};

const LogisticsMap = () => {
  const [activeHub, setActiveHub] = useState<string | null>(null);

  return (
    <div className="w-full relative bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-slate-800/90 backdrop-blur p-4 rounded-lg border border-slate-700">
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <Warehouse className="w-4 h-4 text-blue-400" /> Network Coverage
        </h3>
        <p className="text-slate-400 text-sm mb-3">Hover over a warehouse to see range.</p>
        <div className="space-y-2">
           {WAREHOUSES.map(hub => (
             <div 
                key={hub.id} 
                className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${activeHub === hub.id ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                onMouseEnter={() => setActiveHub(hub.id)}
                onMouseLeave={() => setActiveHub(null)}
             >
               <div className={`w-2 h-2 rounded-full ${activeHub === hub.id ? 'bg-blue-400' : 'bg-slate-600'}`} />
               {hub.city}
             </div>
           ))}
        </div>
      </div>

      <svg viewBox="0 0 1000 600" className="w-full h-auto">
        {/* US Map Background */}
        <path 
          d={US_MAP_PATH} 
          fill="#1e293b" // Slate-800
          stroke="#334155" // Slate-700
          strokeWidth="1"
        />

        {/* Connections (Spokes) */}
        {SPOKES.map((spoke) => {
          const hub = WAREHOUSES.find(h => h.id === spoke.hubId)!;
          const isActive = activeHub === null || activeHub === hub.id;
          return (
            <MapCurve 
              key={`${hub.id}-${spoke.id}`} 
              start={hub.coords} 
              end={spoke.coords} 
              active={isActive} 
            />
          );
        })}

        {/* Cities (Spoke Endpoints) */}
        {SPOKES.map((spoke) => {
           const isActive = activeHub === null || activeHub === spoke.hubId;
           return (
            <g key={spoke.id} className="transition-opacity duration-300" opacity={isActive ? 1 : 0.2}>
              <circle 
                cx={spoke.coords.x} 
                cy={spoke.coords.y} 
                r="3" 
                fill="#94a3b8" // Slate-400
              />
              {isActive && (
                 <text 
                    x={spoke.coords.x} 
                    y={spoke.coords.y + 12} 
                    textAnchor="middle" 
                    fill="#cbd5e1" 
                    fontSize="10" 
                    className="font-sans pointer-events-none"
                 >
                   {spoke.name}
                 </text>
              )}
            </g>
           );
        })}

        {/* Hubs (Warehouses) */}
        {WAREHOUSES.map((hub) => {
          const isActive = activeHub === null || activeHub === hub.id;
          return (
            <g 
              key={hub.id} 
              className="cursor-pointer"
              onMouseEnter={() => setActiveHub(hub.id)}
              onMouseLeave={() => setActiveHub(null)}
            >
              {/* Pulsing effect */}
              {isActive && (
                <circle cx={hub.coords.x} cy={hub.coords.y} r="20" fill="rgba(59, 130, 246, 0.2)">
                  <animate attributeName="r" from="10" to="25" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              
              {/* Icon Marker */}
              <circle cx={hub.coords.x} cy={hub.coords.y} r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              
              {/* Label */}
              <text 
                x={hub.coords.x} 
                y={hub.coords.y - 15} 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize="12" 
                fontWeight="bold"
                className="font-sans pointer-events-none drop-shadow-md"
              >
                {hub.city}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Crowd Cow <span className="text-slate-500 font-normal">Fulfillment</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-orange-600 transition-colors">Our Network</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Services</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Technology</a>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Get a Quote
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-20 pb-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm font-semibold mb-6 border border-orange-500/20">
              Leader in Perishable Fulfillment
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 max-w-4xl">
              Deliver Fresh. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Every Single Time.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
              Scale your frozen and refrigerated e-commerce business with our nationwide 2-day ground network. We handle the cold chain so you can handle the growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20">
                Talk to an Expert <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700">
                View Pricing
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 99.8% Accuracy</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Carbon Neutral Options</div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why brands trust us</h2>
            <p className="text-slate-600 text-lg">We've built the most resilient cold-chain network in America, designed specifically for high-growth D2C food brands.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">Nationwide 2-Day Coverage</h2>
                 <p className="text-slate-600">Explore our strategic network nodes.</p>
            </div>
            <div className="max-w-5xl mx-auto">
                <LogisticsMap />
            </div>
        </div>
      </section>

      {/* Strategic Locations Detail */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="text-orange-600" /> Strategic Hubs
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Watsonville, CA</h4>
                        <p className="text-slate-600 text-sm mt-1">Our West Coast anchor, perfectly positioned to service the California coast and Pacific Northwest efficiently.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Lancaster, TX</h4>
                        <p className="text-slate-600 text-sm mt-1">The central power hub connecting the Midwest and South, dramatically reducing transit times to the heartland.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-slate-900">Scranton, PA</h4>
                        <p className="text-slate-600 text-sm mt-1">Commanding the East Coast corridor, ensuring rapid delivery to the high-density Northeast and Atlantic regions.</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Optimized for speed and savings.</h2>
              <p className="text-lg text-slate-600 mb-6">
                By positioning inventory in our 3 strategic nodes, you reduce shipping zones and transit times. This means cheaper rates for you and happier customers receiving their orders faster.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Lower average shipping zone
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Reduced dry ice requirements
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Redundant inventory protection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your fulfillment?</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of food brands scaling with Crowd Cow's logistics network. Get a custom quote for your business today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-lg">
              Get Started
            </button>
            <button className="bg-orange-700 text-white border border-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-orange-800 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <Package className="w-5 h-5" />
             <span className="font-semibold text-slate-200">Crowd Cow Fulfillment</span>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Crowd Cow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
