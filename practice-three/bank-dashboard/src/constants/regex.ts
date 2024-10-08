const REGEX_PATTERN = {
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
  NAME: /^[a-zA-Z\s]*$/,
  POSTAL_CODE: /^[0-9]{4}$/,
};

export { REGEX_PATTERN };
