import { withRoutePage, withRouter } from '@/Enhance';
import { renderFormItem } from '@/components/CustomForm/FormItem/utils';
import Page from '@/components/Page';
import { ISearchesType } from '@/typings';
import { ConnectState } from '@/typings/connect';
import { connect } from '@umijs/max';
import { Button, Form, Space, Switch } from 'antd-mobile';
import { CheckOutline, CloseOutline } from 'antd-mobile-icons';
import { Fragment } from 'react';
import { compose } from 'redux';

export const basicColumns = [
  [
    { label: '周一', value: 'Mon' },
    { label: '周二', value: 'Tues' },
    { label: '周三', value: 'Wed' },
    { label: '周四', value: 'Thur' },
    { label: '周五', value: 'Fri' },
  ],
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
];

export const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
];

interface IRecord {
  input: string;
}

const Demo = (props) => {
  const [form] = Form.useForm();
  const formList: ISearchesType<any> = [
    {
      name: 'input',
      label: 'input',
      type: 'input',
      initialValue: 'input',
      customParams: '2',
      controlProps: {
        type: 'number',
      },
    },
    {
      name: 'xxx',
      label: 'textarea',
      type: 'textarea',
      initialValue: 'textarea',
      controlProps: {
        rows: 5,
      },
    },
    {
      name: 'stepper',
      label: 'stepper',
      type: 'stepper',
    },
    {
      name: 'checkbox',
      label: 'checkbox',
      type: 'checkbox',
      dict: [
        {
          label: 'zs',
          value: 'zs',
        },
        {
          label: 'l4',
          value: 'l4',
        },
        {
          label: 'w5',
          value: 'w5',
        },
      ],
    },
    {
      name: 'radio',
      label: 'radio',
      type: 'radio',
      dict: [
        {
          label: 'zs',
          value: 'zs',
        },
        {
          label: 'l4',
          value: 'l4',
        },
        {
          label: 'w5',
          value: 'w5',
        },
      ],
    },
    {
      name: 'rate',
      label: 'rate',
      type: 'rate',
      initialValue: '1',
    },
    {
      name: 'slider',
      label: 'slider',
      type: 'slider',
      initialValue: 20,
    },
    {
      name: 'switch',
      label: 'switch',
      type: 'switch',
      initialValue: 1,
    },
    {
      name: 'update',
      label: 'update',
      type: 'update',
      itemProps: {
        noStyle: true,
        shouldUpdate: (pre, cru) => pre?.slider != cru?.slider,
        next(values, form) {
          if (values?.slider != 100) return false;
          return [
            {
              name: 'deddddd',
              label: '动态的',
              type: 'input',
            },
          ];
        },
      },
    },
    {
      name: 'custom',
      label: 'custom',
      type: 'custom',
      initialValue: false,
      Component: (props) => {
        return (
          <div>
            <Switch
              checked={!!props?.value}
              onChange={(e) => props.onChange(!props?.value)}
            />
            <div>{!!props?.value ? 'light' : 'dark'}</div>
          </div>
        );
      },
    },
    {
      name: 'picker',
      label: 'picker',
      type: 'picker',
      controlProps: {
        columns: basicColumns,
        renderContent: (a) => {
          return 'hel';
        },
      },
    },
    {
      name: 'datePicker',
      label: 'datePicker',
      type: 'datePicker',
      controlProps: {},
    },
    {
      name: 'selector',
      label: 'selector',
      type: 'selector',
      controlProps: {
        options,
        multiple: true,
      },
    },
  ];

  return (
    <Page navBar={{ children: 'demo', backArrow: true }}>
      <Form
        form={form}
        footer={
          <Button
            onClick={() => console.log(form.getFieldsValue())}
            block
            type="submit"
            color="primary"
            size="large"
          >
            提交
          </Button>
        }
      >
        {formList.map((item, index) => (
          <Fragment key={index}>
            {renderFormItem({
              ...item,
              form: item?.type == 'update' ? undefined : form
            })}
          </Fragment>
        ))}
      </Form>

      <Space wrap>
        <Switch uncheckedText="关" checkedText="开" />
        <Switch
          checkedText={<CheckOutline fontSize={18} />}
          uncheckedText={<CloseOutline fontSize={18} />}
        />
        <Switch uncheckedText="0" checkedText="1" />
      </Space>
    </Page>
  );
};

export default compose(
  withRoutePage,
  withRouter,
  connect(({ login, global }: ConnectState) => ({ ...login, global })),
)(Demo);
