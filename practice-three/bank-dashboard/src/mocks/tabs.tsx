const classes = {
  input:
    'border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500',
  button:
    'bg-blue-200 text-white-100 py-2 rounded-lg hover:bg-opacity-80 transition duration-300',
};

const MOCK_TAB_DATA = [
  {
    key: 'login',
    title: 'Login',
    tabContent: (
      <form className="flex flex-col gap-4 p-4">
        <input placeholder="Email" type="email" className={classes.input} />
        <input
          placeholder="Password"
          type="password"
          className={classes.input}
        />
        <button className={classes.button} onClick={(e) => e.preventDefault()}>
          Login
        </button>
      </form>
    ),
  },
  {
    key: 'sign-up',
    title: 'Sign up',
    tabContent: (
      <form className="flex flex-col gap-4 p-4">
        <input placeholder="Name" type="text" className={classes.input} />
        <input placeholder="Email" type="email" className={classes.input} />
        <input
          placeholder="Password"
          type="password"
          className={classes.input}
        />
        <button className={classes.button} onClick={(e) => e.preventDefault()}>
          Sign up
        </button>
      </form>
    ),
  },
];

export { MOCK_TAB_DATA };
