import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { cpf } from "cpf-cnpj-validator";

const CreateEmployeerModal = (props) => {
  const [product_selected, setProductSelected] = useState([]);
  const [permission, setPermission] = useState([]);
  const [confimedPassword, setConfimedPassword] = useState(null);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    cpf: yup
      .string()
      .required("CPF is required")
      .test("cpf-valid", "Enter a valid CPF", (value) => cpf.isValid(value)),
    position: yup.string().required("Position is required"),
    salary: yup.string().required("Salary is required"),
    permission: yup.string().required("Permission is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A senha não atende as exigências mínimas de segurança."
      ),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Senhas estão diferentes"),
  });

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const response = await axios.get("http://localhost:8081/permissions");
        setPermission(response.data);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    getPermissions();
  }, []);


  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);
      await axios.post("http://localhost:8081/manager/employees", values);

      props.setShowModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {props.showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-25">
          <div className="relative w-auto my-3 mx-auto max-w-10xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Cadastro de funcionario</h3>
                <p>{product_selected}</p>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  cpf: "",
                  position: "",
                  salary: "",
                  permission: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-black">Name</label>
                      <Field type="text" name="name" className="border border-gray-300 p-2 rounded w-full" />
                      <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Email</label>
                      <Field type="text" name="email" className="border border-gray-300 p-2 rounded" />
                      <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">CPF</label>
                      <Field type="text" name="cpf" className="border border-gray-300 p-2 rounded" />
                      <ErrorMessage name="cpf" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Position</label>
                      <Field type="text" name="position" className="border border-gray-300 p-2 rounded" />
                      <ErrorMessage name="position" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Salary(R$)</label>
                      <Field type="text" name="salary" className="border border-gray-300 p-2 rounded" />
                      <ErrorMessage name="salary" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Permission</label>
                      <Field as="select" name="permission" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Select permission</option>
                        {permission.map((perm) => (
                          <option key={perm.id} value={perm.name}>
                            {perm.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="permission" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Password</label>
                      <Field type="password" name="password" className="border border-gray-300 p-2 rounded" />
                      <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-black">Confirm Password</label>
                      <Field type="password" name="confirmPassword" className="border border-gray-300 p-2 rounded" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                      {confimedPassword === false && (
                        <label className="text-red-500">Passwords do not match</label>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => props.setShowModal(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Criar funcionário
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEmployeerModal;
