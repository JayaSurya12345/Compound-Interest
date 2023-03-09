import styles from "@/styles/Input.module.css";

export default function DropDownInput({ value, setValue }) {
  return (
    <div className={styles.inputBox}>
      <div className={" sm:flex  justify-between flex-warp "}>
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={
            "text-blue-600 w-[150px] h-[40px] bg-[#D1E3FF] bg-opacity-[0.39] border-2 border-solid border-[#9BB0D3] rounded-[100px] text-center"
          }
        >
          <option value="1">Annualy</option>
          <option value="4">Quaterly</option>
          <option value="2">SemiAnnualy</option>
          <option value="12">Monthly</option>
        </select>
      </div>
      </div>
  );
}
