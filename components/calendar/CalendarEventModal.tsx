import { Form, Input, Modal, Select } from 'antd';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';

const { useForm } = Form;

interface Props {
  handleCloseModal: () => void;
  selectedEvent: any;
}

const categories = [
  { value: 'Work', label: 'Work', color: 'border-primary' },
  { value: 'Personal', label: 'Personal', color: 'border-tertiary' },
  { value: 'Education', label: 'Education', color: 'border-secondary' },
];

function CalendarEventModal({
  handleCloseModal,
  selectedEvent,
}: Props): ReactElement {
  const [form] = useForm();
  const timeOptions = React.useMemo(() => {
    const options: any[] = [];
    [...(Array(24) as any).keys()].map((h: any) => {
      [0, 15, 30, 45].map((m) => {
        const time = `${h.toString().padStart(2, '0')}:${m
          .toString()
          .padStart(2, '0')}`;
        options.push({ value: time, label: time });
        return m;
      });
      return h;
    });
    return options;
  }, []);

  useEffect(() => {
    if (selectedEvent.start) {
      form.setFieldsValue({ ...selectedEvent });
    }
  }, []);

  return (
    <Modal
      onCancel={handleCloseModal}
      className='modal-right fade rounded-xl'
      visible={true}
      title='Add Event'
    >
      <Form form={form} layout='vertical'>
        <Form.Item name='start' initialValue={'00:00'} label='เวลาเริ่ม'>
          <Select>
            {timeOptions.map((_slot) => (
              <Select.Option key={_slot.value} value={_slot.value}>
                {_slot.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='end' initialValue={'00:00'} label='เวลาจบ'>
          <Select>
            {timeOptions.map((_slot) => (
              <Select.Option key={_slot.value} value={_slot.value}>
                {_slot.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='title' initialValue={'00:00'} label='ชื่อกิจกรรม'>
          <Input />
        </Form.Item>
        <Form.Item name='category' initialValue={'Work'} label='ประเภท'>
          <Select>
            {categories.map((_slot) => (
              <Select.Option key={_slot.value} value={_slot.value}>
                {_slot.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CalendarEventModal;
