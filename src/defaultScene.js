const defaultScene = {
  name: 'The Pool of Dreams',
  background: {
    src: 'https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2019/05/Jungle-Temple-RPG-battle-map-color.jpg', 
    width: 1600,
    height: 1120,
  },
  grid: {
    hexSize: 5.4,
    width: 16,
    height: 13,
    xOffset: 21.4,
    yOffset: -2,
  },
  assets: [
    {
      type: 'avatar',
      src: "https://theoneworldblog.files.wordpress.com/2017/11/shepherd-druid.jpg?w=100",
      x: 1315,
      y: 519,
      textColor: 'rgba(255,255,255,0.87)',
      backgroundColor: 'rgba(255,51,51,1)',
      text: 'Dalla',
      width: 1,
      height: 1
    },
    {
      type: 'avatar',
      src: "https://external-preview.redd.it/rBBZcGNkiqI9Bvx-fB9XT9KEniDWNeuBNvs5EtZylYc.png?auto=webp&s=149ae6bfeeccd69989b1650309d623352fcaa4ca",
      x: 215,
      y: 246,
      textColor: 'rgba(255,255,255,0.87)',
      backgroundColor: 'rgba(55,251,51,1)',
      text: 'Thader',
      width: 1,
      height: 1
    }, 
    {
      type: 'object',
      src: "https://i.pinimg.com/originals/f2/8d/ed/f28ded56a3a38308a0d770d009f90416.png",
      x: 476,
      y: 616,
      width: 150,
      height: 150,
      rotation: 140,
      locked: true,
    }, 
    {
      type: 'object',
      src: "https://i.pinimg.com/originals/f2/8d/ed/f28ded56a3a38308a0d770d009f90416.png",
      x: 536,
      y: 436,
      width: 150,
      height: 150,
      rotation: 0,
      locked: true,
    }, 
    {
      type: 'text',
      text: 'Hero',
      fontSize: 80,
      fontWeight: 'bold',
      x: 795,
      y: 320,
      textColor: 'rgba(255,255,2550.87)',
      backgroundColor: 'rgba(0,0,0,0)',
      width: 360,
      height: 240,
      locked: true,
    },
    {
      type: 'text',
      text: 'Drop',
      fontSize: 80,
      fontWeight: 'bold',
      x: 845,
      y: 412,
      textColor: 'rgba(255,255,2550.87)',
      backgroundColor: 'rgba(0,0,0,0)',
      width: 360,
      height: 240,
      locked: true,
    }
  ]
}

export default defaultScene;