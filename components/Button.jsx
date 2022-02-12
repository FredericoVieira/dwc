import Image from "next/image";
import styles from "../styles/components/button.module.scss";

const Button = ({
  children,
  icon,
  onClick,
  variant = "primary",
  size = "medium",
  noText,
  selected,
  disabled,
}) => (
  <button
    className={`${styles.button} ${styles[variant]} ${styles[size]}
    ${noText && styles["no-text"]} ${noText && selected && styles["no-opacity"]}
    ${disabled && styles.disabled}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && (
      <span className={`${!noText ? styles.icon : styles["icon-flex"]}`}>
        <Image src={icon} alt="Icon" priority />
      </span>
    )}
    {children}
  </button>
);

export default Button;
