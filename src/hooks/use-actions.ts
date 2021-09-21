//created in video 204
import { useMemo } from 'react'; //video 231
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

//useAction hook:
export const useActions = () => {
  const dispatch = useDispatch();

  //explained in video 231:
  //useMemo is almost like useState and useEffect put together
  //arrow function is a first argument, and [dispatch] is second function inside array
  //whenever something change in dispatch function, React will re-run first (arrow) function again
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
