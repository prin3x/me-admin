import { Col, List, Row } from "antd";
import React from "react";
import { IServiceContact } from "../../services/serviceContact/service-contact.model";

type Props = {
  data: IServiceContact[];
};

function ServiceContactTableList({ data }: Props) {
  return (
    <div>
      <Row className="h-40 items-center" justify="start">
        <Col span={6} offset={1}>
          <div className="lg:text-6xl font-bold text-white md:text-4xl xs:text-xl">
            Posts
          </div>
        </Col>
      </Row>
      <table className="border-collapse border border-slate-300 w-full bg-white">
        <thead>
          <tr
            style={{ backgroundColor: "#0F52BA" }}
            className="text-white text-[30px]"
          >
            <th className="border border-slate-300">OBJECTIVE</th>
            <th className="border border-slate-300">CONTACT</th>
            <th className="border border-slate-300">NAME</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <>
              <tr
                key={item.id}
                style={{ backgroundColor: "rgba(22,85,183,0.1)" }}
                className="text-[24px]"
              >
                <td
                  className="font-bold border border-slate-300 pl-7"
                  style={{ color: "#1655B7" }}
                >
                  {item.title}
                </td>
                <td className="border border-slate-300"></td>
                <td className="border border-slate-300"></td>
              </tr>
              {item.serviceContactDetail.map((contact) => (
                <tr key={contact.id} className="text-[24px]">
                  <td className="border border-slate-300 pl-7">
                    {contact.objective}
                  </td>
                  <td className="border border-slate-300 text-center">
                    <p className="mb-0">{contact.contactID}</p>
                    <p
                      className="mb-0 text-[19px]"
                      style={{ color: "#0F52BA" }}
                    >
                      {contact.contactPhoneNumber}
                    </p>
                  </td>
                  <td className="border border-slate-300 text-center">
                    {contact.name}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceContactTableList;
