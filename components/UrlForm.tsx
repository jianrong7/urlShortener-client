import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useState, Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import { UrlResponse } from "../pages";
import { Switch } from "@headlessui/react";

interface MyFormValues {
  url: string;
  custom: string;
}

const urlSchema = yup.object().shape({
  url: yup
    .string()
    .required("Required")
    .min(5, "Too short!")
    .matches(
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
      "String is not a URL!"
    ),
  custom: yup
    .string()
    .max(20, "Too long!")
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      "Custom link can only contain alphabets, numbers and dashes."
    ),
});

export default function UrlForm({
  setUrlResponse,
}: {
  setUrlResponse: Dispatch<SetStateAction<UrlResponse | null>>;
}) {
  const [isCustom, setIsCustom] = useState(false);
  const initialValues: MyFormValues = { url: "", custom: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={urlSchema}
      onSubmit={async (values) => {
        try {
          if (isCustom) {
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_SERVER_DEV}api/custom`,
              {
                origUrl: values.url,
                urlId: values.custom,
              }
            );
            setUrlResponse(response.data);
          } else {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_SERVER_DEV}api/short`,
              {
                origUrl: values.url,
              }
            );
            setUrlResponse(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col justify-center">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="text-xl font-semibold">
              Paste the URL to be shortened
            </label>
            <Switch.Group>
              <div className="flex items-center">
                <Switch.Label className="mr-4 font-semibold">
                  Custom
                </Switch.Label>
                <Switch
                  checked={isCustom}
                  onChange={setIsCustom}
                  className={`${
                    isCustom ? "bg-purple-600" : "bg-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none`}
                >
                  <span
                    className={`transform transition ease-in-out duration-200 inline-block w-5 h-5 bg-white rounded-full
                      ${isCustom ? "translate-x-7" : "translate-x-0"}
                    `}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>

          <div className="flex flex-wrap justify-between items-center relative pt-2 pb-5">
            <div className="flex-1 mr-3">
              <Field
                id="url"
                name="url"
                placeholder="Paste the URL here"
                className="border-2 border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded p-3 mb-1 w-full"
              />
              {errors.url && touched.url && (
                <div className="text-red-500 font-semibold text-sm absolute bottom-0">
                  {errors.url}
                </div>
              )}
            </div>
            {isCustom && (
              <div className="flex-1 mr-3">
                <Field
                  id="custom"
                  name="custom"
                  placeholder="Custom link"
                  className="border-2 border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded p-3 flex-1 mb-1 w-full"
                />
                {errors.custom && touched.custom && (
                  <div className="text-red-500 font-semibold text-sm absolute bottom-0">
                    {errors.custom}
                  </div>
                )}
              </div>
            )}
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-max px-3 py-2 rounded text-white font-semibold mb-1"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
