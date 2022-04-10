import { Button, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useEffect } from 'react';
import { ModalEditType } from '../../services/calendar/calendar.model';
import locale from 'antd/es/date-picker/locale/th_TH';

interface Props {
  handleCloseModal: () => void;
  selectedEvent: any;
  makeNewEvent: () => void;
  form: any;
  categories: any[];
  isProcessing: boolean;
  deleteEvent: any;
  toggleShowTime: () => void;
  isShowTime: boolean;
}

function CalendarEventModal({
  handleCloseModal,
  selectedEvent,
  makeNewEvent,
  form,
  categories,
  isProcessing,
  deleteEvent,
  toggleShowTime,
  isShowTime,
}: Props): ReactElement {
  const timeOptions = React.useMemo(() => {
    const options: any[] = [];
    [...(Array(24) as any).keys()].slice(6, 22).map((h: any) => {
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
    if (selectedEvent.dateTime) {
      form.setFieldsValue({ ...selectedEvent });
    }
  }, []);

  useEffect(() => {
    if (
      categories.length > 0 &&
      selectedEvent.modalType === ModalEditType.MAKE_EVENT
    ) {
      form.setFieldsValue({ categoryName: categories[0]?.id });
    }
  }, [categories]);

  return (
    <Modal
      onCancel={handleCloseModal}
      className='modal-right fade rounded-xl'
      visible={true}
      title='Calendar Event Info'
      footer={false}
    >
      <Form form={form} layout='vertical'>
        <Form.Item name='dateTime' label='เวลาเริ่ม'>
          <DatePicker.RangePicker
            locale={locale}
            className='w-full'
            showTime={isShowTime}
            renderExtraFooter={() => (
              <Button onClick={toggleShowTime} type='primary'>
                {isShowTime ? 'All Day' : 'Select Time'}
              </Button>
            )}
          />
        </Form.Item>
        <Form.Item name='title' label='ชื่อกิจกรรม'>
          <Input />
        </Form.Item>
        <Form.Item name='categoryName' label='ประเภท'>
          <Select placeholder=''>
            {categories?.map((_slot) => (
              <Select.Option key={_slot.title} value={_slot.title}>
                {_slot.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Row justify='center'>
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
          {selectedEvent.modalType === ModalEditType.EDIT_EVENT && (
            <Form.Item>
              <Button
                loading={isProcessing}
                onClick={() => deleteEvent(selectedEvent.id)}
                type='link'
              >
                Delete
              </Button>
            </Form.Item>
          )}
        </Row>
      </Form>
    </Modal>
  );
}

export default CalendarEventModal;
