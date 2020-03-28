// Temporary data until we connect with Firebase
interface Todos {
  title: string;
  completed: boolean;
}

export interface TempData {
  name: string;
  color: string;
  todos: Todos[];
}

const tempData: TempData[] = [
  {
    name: 'Plan a Trip',
    color: '#24A6d9',
    todos: [
      {
        title: 'Book Flight',
        completed: false,
      },
      {
        title: 'Passport Check',
        completed: true,
      },
      {
        title: 'Reserve Hotel Room',
        completed: false,
      },
      {
        title: 'Pack Luggage',
        completed: false,
      },
    ],
  },
  {
    name: 'Errands',
    color: '#24A6d9',
    todos: [
      {
        title: 'Book Flight',
        completed: true,
      },
      {
        title: 'Passport Check',
        completed: false,
      },
      {
        title: 'Reserve Hotel Room',
        completed: true,
      },
      {
        title: 'Pack Luggage',
        completed: false,
      },
    ],
  },
  {
    name: 'Read a Book',
    color: '#24A6d9',
    todos: [
      {
        title: 'Book Flight',
        completed: false,
      },
      {
        title: 'Passport Check',
        completed: false,
      },
      {
        title: 'Reserve Hotel Room',
        completed: true,
      },
      {
        title: 'Pack Luggage',
        completed: false,
      },
    ],
  },
];

export default tempData;
