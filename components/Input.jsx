import styles from "../styles/components/input.module.scss";

const Input = ({ value, onChange, placeholder, style }) => {
  const handleChange = ({ target }) => onChange(target.value);

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={styles.input}
      style={style}
    />
  );
};

export default Input;
