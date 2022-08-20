import { Button, InputNumber } from "antd";
import { useEffect, useRef } from "react";

export function IndexChanger({ contactDetail, _onChangeIndex }) {
  const inputNumberRef = useRef();
  useEffect(() => {
    (inputNumberRef.current as any).value = contactDetail.index;
  }, [contactDetail]);
  return (
    <div className="flex gap-5">
      <InputNumber min={1} ref={inputNumberRef} />
      <Button
        type="primary"
        ghost
        onClick={() =>
          _onChangeIndex(
            contactDetail.id,
            (inputNumberRef.current as any).value
          )
        }
      >
        ADJUST
      </Button>
    </div>
  );
}
