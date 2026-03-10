import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

const initialState = {
  disciplines: [],
  tasks: [],
  grades: [],
  studyPlans: [],
  loading: true,
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case 'ADD_DISCIPLINE':
      return { ...state, disciplines: [...state.disciplines, action.payload] };
    case 'UPDATE_DISCIPLINE':
      return {
        ...state,
        disciplines: state.disciplines.map(d => d.id === action.payload.id ? action.payload : d)
      };
    case 'DELETE_DISCIPLINE':
      return {
        ...state,
        disciplines: state.disciplines.filter(d => d.id !== action.payload)
      };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      };
    case 'ADD_GRADE':
      return { ...state, grades: [...state.grades, action.payload] };
    case 'DELETE_GRADE':
      return {
        ...state,
        grades: state.grades.filter(g => g.id !== action.payload)
      };
    case 'ADD_STUDY_PLAN':
      return { ...state, studyPlans: [...state.studyPlans, action.payload] };
    case 'DELETE_STUDY_PLAN':
      return {
        ...state,
        studyPlans: state.studyPlans.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load data for the specific user
  useEffect(() => {
    if (user) {
      const storedData = localStorage.getItem(`taskuni_data_${user.id}`);
      if (storedData) {
        try {
          dispatch({ type: 'SET_DATA', payload: JSON.parse(storedData) });
        } catch (e) {
          console.error('Error parsing stored data:', e);
          dispatch({ type: 'SET_DATA', payload: { disciplines: [], tasks: [], grades: [], studyPlans: [] } });
        }
      } else {
        dispatch({ type: 'SET_DATA', payload: { disciplines: [], tasks: [], grades: [], studyPlans: [] } });
      }
    }
  }, [user]);

  // Save data whenever it changes
  useEffect(() => {
    if (user && !state.loading) {
      const { loading, ...dataToSave } = state;
      localStorage.setItem(`taskuni_data_${user.id}`, JSON.stringify(dataToSave));
    }
  }, [state, user]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};
