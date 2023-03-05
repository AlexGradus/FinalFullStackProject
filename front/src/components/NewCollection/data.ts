const ImagesForChoiseFull ={
    images: {
     'img_1': {id:'img_1',content:'https://i.ibb.co/smW7Lm5/alcohol.jpg'},
     'img_2': {id:'img_2',content:'https://i.ibb.co/8bSzGmG/oldbooks.webp'},
     'img_3': {id:'img_3',content:'https://i.ibb.co/PhP1fM2/cars-cars.jpg'},
     'img_4': {id:'img_4',content:'https://i.ibb.co/hBf56DG/dreamstime-s-29389535-2-1200x753.jpg'},
     },
    columns:{
      'column-1':{
        id:'column-1',
        title:'Choise (images)',
        imagesId: ['img_1','img_2','img_3','img_4'],
      },
      'column-2':{
        id:'column-2',
        title:'Drag here(Just One)',
        imagesId: [],
      }
    },
    columnOrder:[ 'column-1','column-2'],
    
    }

    export default ImagesForChoiseFull;