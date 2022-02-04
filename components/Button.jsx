import Image from "next/image";
import styles from "../styles/components/button.module.scss";

const Button = ({
  children,
  icon,
  onClick,
  variant = "primary",
  size = "medium",
  maxWidth,
}) => (
  <button
    className={`${styles.button} ${styles[variant]} ${styles[size]}`}
    onClick={onClick}
    {...(maxWidth && { style: { maxWidth } })}
  >
    {icon && (
      <span className={styles.icon}>
        <Image src={icon} alt="Icon" height={20} width={20} />
      </span>
    )}
    {children}
  </button>
);

export default Button;
