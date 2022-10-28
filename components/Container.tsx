import { FunctionComponent } from 'preact';

const Container: FunctionComponent = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="font-mono max-w-xl antialiased mt-8 mx-auto">
        {children}
      </div>
    </div>
  )
}

export default Container;