import styles from "../styles/components/input.module.scss";

const Input = ({ value, onChange, placeholder, disabled, style }) => {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={styles.input}
      disabled={disabled}
      style={style}
    />
  );
};

export default Input;
