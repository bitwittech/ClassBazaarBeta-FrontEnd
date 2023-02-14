const initialAlert = {
  open: false,
  message: null,
  variant: null,
};

export const alert = (state = initialAlert, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return (state = action.payload);
    default:
      return state;
  }
};

const initialAuth = {
  isAuth: false,
  email: null,
  name: null,
  mobile_no: null,
  token: null,
};

export const auth = (state = initialAuth, action) => {
  switch (action.type) {
    case 'AUTH':
      return (state = action.payload);
    default:
      return state;
  }
};
