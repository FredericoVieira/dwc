import ReactLoading from "react-loading";
import Button from "../components/Button";
import { networkMapper } from "../utils/formatter";
import styles from "../styles/components/content.module.scss";

export default function Content({
  infos,
  getInfosFromWalletAddress,
  isLoading,
  error,
}) {
  const handleContent = () => {
    const { networkId, token, balance, context } = infos;
    if (isLoading)
      return <ReactLoading type="cylon" color="#EA3031" width="20%" />;
    else if (error)
      return (
        <div className={styles.error}>
          {error.title}
          <p className={styles.message}>{error.message}</p>
        </div>
      );
    else if (networkId && token && balance)
      return (
        <div className={styles.info}>
          <div className={styles.context}>
            <div className={styles.network}>
              <p className={styles.title}>Network: </p>
              <div className={styles["network-buttons"]}>
                {Object.keys(networkMapper).map((key) => {
                  return (
                    <Button
                      key={key}
                      icon={networkMapper[key].logo}
                      noText
                      onClick={() =>
                        networkId != key && getInfosFromWalletAddress(key)
                      }
                      selected={networkId == key}
                      disabled={context === "metamask"}
                    />
                  );
                })}
              </div>
            </div>
            <p className={styles.value}>{networkMapper[networkId].network}</p>
          </div>
          <div className={styles.context}>
            <p className={styles.title}>Balance:</p>
            <p className={styles.value}>
              {token}: {balance}
            </p>
          </div>
          <div className={styles.context}>
            <p className={styles.title}>Transactions:</p>
            <p className={styles.value}>Comming soon...</p>
          </div>
        </div>
      );
  };

  return <div className={styles.content}>{handleContent()}</div>;
}
