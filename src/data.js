const tasks = [
    {
        id: 1,
        title: 'Lorem ipusm i taka na tatak',
        image: 'https://cdn.pixabay.com/photo/2015/03/14/05/39/mastino-napoletano-672800_960_720.jpg',
        description: 'ima i e mnogo seriozno i dalgo opisanie'
    },
    {
        id: 2,
        title: 'Lorem ipusm without image',
        image: '',
        comments: [
            {
                id: 1,
                author: 'Gosho',
                date: new Date(),
                comment: 'Lorem ipsum do bez krai'
            },
            {
                id: 2,
                author: 'Pesho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
            {
                id: 3,
                author: 'Mincho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
            {
                id: 4,
                author: 'Gosho',
                date: new Date(),
                comment: 'Lorem ipsum do bez krai'
            },
            {
                id: 5,
                author: 'Pesho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
            {
                id: 6,
                author: 'Mincho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
        ]
    },
    {
        id: 3,
        title: 'Lorem ipusm i taka na tatak',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg',
        checklist: ['first', 'second', 'after second', 'maye third']
    },
    {
        id: 4,
        title: 'Lorem ipusm without image',
        image: '',
        dueDate: new Date()
    },
    {
        id: 5,
        title: 'Lorem ipusm i taka na tatak',
        image: 'https://randomwordgenerator.com/img/picture-generator/jump-2040426_640.jpg'
    },
    {
        id: 6,
        title: 'Lorem ipusm without image',
        image: '',
        checklist: []
    },
    {
        id: 7,
        title: 'Голям космос, разбит кораб, бла, бла, бла, колко ли симовла ще е ок? Така добре ли е? Или още малко?',
        image: 'https://randomwordgenerator.com/img/picture-generator/57e7d0444f53ac14f1dc8460962e33791c3ad6e04e507441722a72dc9e44c1_640.jpg',
        description: 'ima',
        comments: [
            {
                id: 1,
                author: 'Gosho',
                date: new Date(),
                comment: 'Lorem ipsum do bez krai'
            },
            {
                id: 2,
                author: 'Pesho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
            {
                id: 3,
                author: 'Mincho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
            {
                id: 4,
                author: 'Gosho',
                date: new Date(),
                comment: 'Lorem ipsum do bez krai'
            },
            {
                id: 5,
                author: 'Pesho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
            {
                id: 6,
                author: 'Mincho',
                date: new Date(),
                comment: ' This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. </Typography>'
            },
        ],
        checklist: ['orange', 'banana', 'tomato'],
        dueDate: new Date(),
    },
    {
        id: 8,
        title: 'Beautiful white background',
        image: 'https://animaloilmaker.com/images/jpg-white-2.jpg'
    }
]

const lists = [
    { id: 1, title: 'Backlog', tasks },
    { id: 2, title: 'To Do', tasks },
    { id: 3, title: 'Doing', tasks },
    { id: 4, title: 'Review', tasks },
    { id: 5, title: 'Done', tasks },
]

export default lists;