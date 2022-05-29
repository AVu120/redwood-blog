import { MetaTags, useMutation } from '@redwoodjs/web'
import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { CreateContactInput, MutationcreateContactArgs } from 'types/graphql'
import { toast, Toaster } from '@redwoodjs/web/toast'
interface FormValues {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation<
    CreateContactInput,
    MutationcreateContactArgs
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({
      variables: {
        input: data,
      },
    })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">
          Name:{' '}
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />
        <Label name="email" errorClassName="error">
          Email:{' '}
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />
        <Label name="message" errorClassName="error">
          Message:{' '}
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
