export default () => {
  return {
    name: 'created_at',
    type: 'timestamptz',
    isNullable: false,
    default: 'now()'
  };
};
