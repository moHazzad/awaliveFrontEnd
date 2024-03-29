
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const ErrorPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to={'/'} type="primary">Back Home</Link>}
  />
);
export default ErrorPage;