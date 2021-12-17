import { Button, Form, Input, Modal, Select } from 'antd';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import { ModalEditType } from '../../services/calendar/calendar.model';

const { useForm } = Form;

interface Props {
  handleCloseModal: () => void;
  selectedEvent: any;
  makeNewEvent: () => void;
  form: any;
  categories: any[];
  isProcessing: boolean;
}

function CalendarEventModal({
  handleCloseModal,
  selectedEvent,
  makeNewEvent,
  form,
  categories,
  isProcessing,
}: Props): ReactElement {
  const timeOptions = React.useMemo(() => {
    const options: any[] = [];
    [...(Array(24) as any).keys()].slice(6,22).map((h: any) => {
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

  useEffect(() => {
    if (categories.length > 0 && selectedEvent.modalType === ModalEditType.MAKE_EVENT) {
      form.setFieldsValue({ categoryId: categories[2]?.id });
    } 
  }, [categories]);

  return (
    <Modal
      onCancel={handleCloseModal}
      className='modal-right fade rounded-xl'
      visible={true}
      title='Add Event'
      footer={false}
    >
      <Form form={form} layout='vertical'>
        <Form.Item name='start' label='เวลาเริ่ม'>
          <Select>
            {timeOptions.map((_slot) => (
              <Select.Option key={_slot.value} value={_slot.value}>
                {_slot.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='end' label='เวลาจบ'>
          <Select >
            {timeOptions.map((_slot) => (
              <Select.Option key={_slot.value} value={_slot.value}>
                {_slot.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='title' label='ชื่อกิจกรรม'>
          <Input />
        </Form.Item>
        <Form.Item name='categoryId' label='ประเภท'>
          <Select placeholder=''>
            {categories.map((_slot) => (
              <Select.Option key={_slot.id} value={_slot.id}>
                {_slot.category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            loading={isProcessing}
            onClick={makeNewEvent}
            type='primary'
            htmlType='submit'
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CalendarEventModal;
