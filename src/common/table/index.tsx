import { useRef, useState } from 'react'
import './index.less'
import {
  Button,
  Input,
  Modal,
  Form,
  FormInstance,
  FormProps,
  Popover,
  Space,
} from 'antd'
import { useRootDocument } from '@/utils/hooks'
import { deleteModuleOneItem } from '@/api'
const OptionHeader = ({
  finshHandler,
}: {
  finshHandler: (value: unknown) => Promise<unknown> | unknown
}) => {
  const formRef = useRef<null | FormInstance>(null)
  const [isModalOpen, setModalState] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const getContainerMethod = useRootDocument()
  const showModal = () => {
    setModalState(!isModalOpen)
  }
  const modalConfirm = () => {
    if (formRef.current) {
      formRef.current.submit()
    }
  }

  const modalCancel = () => {
    setModalState(false)
  }

  const onFinish: FormProps<unknown>['onFinish'] = async (values) => {
    setConfirmLoading(true)
    await finshHandler(values)
    if (formRef.current) {
      formRef.current.resetFields()
    }
    setConfirmLoading(false)
  }

  const onFinishFailed: FormProps<unknown>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setConfirmLoading(false)
  }

  return (
    <>
      <div className="header-options">
        <Button
          type="primary"
          children="Create"
          onClick={showModal}
          loading={isModalOpen}
        />
      </div>

      <Modal
        title="Create-{name}"
        okText="Submit"
        destroyOnClose
        open={isModalOpen}
        onOk={modalConfirm}
        onCancel={modalCancel}
        confirmLoading={confirmLoading}
        getContainer={getContainerMethod}
      >
        <Form
          className="create-form"
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          ref={formRef}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export type DeleteState = 'success' | 'fail'
export type DeleteButtonProps = {
  id: string
  namespace: string
  deleteCallback: (state: DeleteState) => void
}

const DeleteButton = (props: DeleteButtonProps) => {
  const { id, deleteCallback, namespace } = props
  const [open, setOpen] = useState(false)
  const [loadingState, setLoadingState] = useState(false)

  const hide = () => {
    setOpen(false)
  }
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const PopverContentRender = () => {
    const delHandler = async () => {
      if (loadingState) return
      setLoadingState(true)
      // 模拟接口
      try {
        const res = await deleteModuleOneItem(namespace, { id })
        const state = res.ok
        if (!state) {
          throw Error('删除失败')
        }
        deleteCallback('success')
        hide()
      } catch {
        deleteCallback('fail')
      } finally {
        setLoadingState(false)
      }
    }
    return (
      <>
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            danger
            children="确认"
            onClick={delHandler}
            loading={loadingState}
          />
          <Button type="dashed" size="small" children="取消" onClick={hide} />
        </Space>
      </>
    )
  }

  return (
    <>
      <Popover
        trigger="click"
        title="确认要删除该数据吗"
        content={PopverContentRender}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="link" danger children="Delete" />
      </Popover>
    </>
  )
}

export { OptionHeader, DeleteButton }
