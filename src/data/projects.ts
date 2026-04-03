export interface Project {
  slug: string;
  title: string;
  description: string;
  cover: string;
  featured: boolean;
}

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const projects: Project[] = [
  {
    slug: 'custom-cybertruck',
    title: 'Custom Cybertruck',
    description: 'Designed and fabricated a tubular exoskeleton, roof rack, bumpers, molle panels, and offroad lighting for a client-commissioned Tesla Cybertruck build.',
    cover: `${base}projects/custom-cybertruck/images/Isometric With Lights.jpg`,
    featured: true,
  },
  {
    slug: 'hybrid-racecar',
    title: 'Hybrid Racecar',
    description: 'Designed and integrated a front-wheel-drive electric drivetrain into an SCCA Spec Racer Ford as a "push to pass" hybrid system for endurance racing.',
    cover: `${base}projects/hybrid-racecar/images/Entire Racecar team posing with the finished testbench version of the racecar (cover photo).jpeg`,
    featured: true,
  },
  {
    slug: 'restomod-3000gt-vr4',
    title: 'Restomod 3000GT VR4',
    description: 'Took a rusted, non-functional 1997 Mitsubishi 3000GT VR4 through two engine rebuilds, a transmission overhaul, chassis restoration, and iterative ECU tuning over seven years.',
    cover: `${base}projects/restomod-3000gt-vr4/images/3000gt cover photo.jpg`,
    featured: true,
  },
  {
    slug: 'hydrolysis-power-cell',
    title: 'Hydrolysis Power Cell',
    description: 'Designed and built a portable hydrogen generation system using water electrolysis, including custom gaskets, electrode stack, and gas separation membrane.',
    cover: `${base}projects/hydrolysis-power-cell/images/hydrogen generator beauty shot.JPG`,
    featured: false,
  },
  {
    slug: 'custom-electric-skateboard',
    title: 'Custom Electric Skateboard',
    description: 'Built a long-range electric skateboard using a custom 10s2p P45B battery pack, hub motors sourced from a Meepo V4S, and an open-source VESC-based ESC.',
    cover: `${base}projects/custom-electric-skateboard/images/posing with the painted deck.JPG`,
    featured: false,
  },
];
