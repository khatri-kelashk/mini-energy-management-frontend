import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { submitTicket } from "../../features/maintenance/maintenanceSlice";

// ---------------------- Dummy Data for <Select> dropdowns ----------------------
const templateList = ["Power Failure", "Battery Replacement", "Site Down", "DG Issue"];
const sitesList = ["SITE-001", "SITE-002", "SITE-003", "SITE-004"];
const assignees = ["Ali Khan", "John Doe", "Haroon", "Technician Team"];
const serviceImpactList = ["High", "Medium", "Low", "No Impact"];
const qcqat1List = ["QC1-A", "QC1-B", "QC1-C"];
const qcqat2List = ["QC2-A", "QC2-B", "QC2-C"];

// ----------------------- Yup Validation Schema -----------------------
const schema = yup.object().shape({
  template: yup.string().required("Please select a template"),
  siteName: yup.string().required("Please select a site"),
  zone: yup.string().required("Zone is required"),
  region: yup.string().required("Region is required"),
  clusterId: yup.string().required("Cluster ID is required"),
  hubSite: yup.string().required("Hub Site is required"),
  templateName: yup.string().required("WO Template Name required"),
  assignee: yup.string().required("Please select an assignee"),
  subject: yup.string().required("Subject is required"),
  performer: yup.string().required("Activity Performer is required"),
  impact: yup.string().required("Please select Service Impact"),
  qc1: yup.string().required("Select QCQAT 1"),
  qc2: yup.string().required("Select QCQAT 2"),
  startTime: yup.string().required("Planned Start Time required"),
  endTime: yup
    .string()
    .required("Planned End Time required")
    .test("is-after", "End time must be after start time", function (value) {
      return new Date(value) > new Date(this.parent.startTime);
    }),
});

export default function TicketDrawer({ open, onClose, siteId }) {
  const dispatch = useDispatch();
  const { submitting } = useSelector((s) => s.maintenance);

  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const onSubmit = async (formData) => {
    formData.fileName = fileName;
    formData.siteId = siteId;
    formData.createdAt = new Date().toISOString();

    const result = await dispatch(submitTicket(formData));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Work Order Submitted Successfully");
      reset();
      setFileName("");
      onClose();
    } else {
      alert("❌ Failed to submit Work Order");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-[#1b1c21] text-white shadow-xl transition-all duration-300 overflow-y-auto
      ${open ? "w-[500px] p-6" : "w-0 p-0"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create Work Order</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-white">✕</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Template */}
        <div>
          <label className="text-sm">Select WO Template</label>
          <select {...register("template")} className="input">
            <option value="" className="text-gray-600">Select Template</option>
            {templateList.map((t) => (
              <option key={t} className="text-gray-600">{t}</option>
            ))}
          </select>
          <p className="error">{errors.template?.message}</p>
        </div>

        {/* Site */}
        <div>
          <label className="text-sm">Select Site</label>
          <select {...register("siteName")} className="input">
            <option value="" className="text-gray-600">Select Site</option>
            {sitesList.map((s) => (
              <option key={s} className="text-gray-600">{s}</option>
            ))}
          </select>
          <p className="error">{errors.siteName?.message}</p>
        </div>

        {/* Zone + Region */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Zone</label>
            <input {...register("zone")} className="input" />
            <p className="error">{errors.zone?.message}</p>
          </div>
          <div>
            <label className="text-sm">Region</label>
            <input {...register("region")} className="input" />
            <p className="error">{errors.region?.message}</p>
          </div>
        </div>

        {/* Cluster ID + Hub Site */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Cluster ID</label>
            <input {...register("clusterId")} className="input" />
            <p className="error">{errors.clusterId?.message}</p>
          </div>
          <div>
            <label className="text-sm">Hub Site</label>
            <input {...register("hubSite")} className="input" />
            <p className="error">{errors.hubSite?.message}</p>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="text-sm">Upload File</label>
          <div className="mt-2 bg-[#2b2d33] p-6 rounded border border-gray-700 text-center">
            <input type="file" onChange={handleFileUpload} className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="cursor-pointer px-4 py-2 bg-purple-600 rounded">
              Browse File
            </label>
            <div className="mt-3 text-gray-300">{fileName || "No file uploaded yet"}</div>
          </div>
        </div>

        {/* Template name */}
        <div>
          <label className="text-sm">WO Template Name</label>
          <input {...register("templateName")} className="input" />
          <p className="error">{errors.templateName?.message}</p>
        </div>

        {/* Assignee */}
        <div>
          <label className="text-sm">Assignee</label>
          <select {...register("assignee")} className="input">
            <option value="" className="text-gray-600">Select Assignee</option>
            {assignees.map((a) => (
              <option key={a} className="text-gray-600">{a}</option>
            ))}
          </select>
          <p className="error">{errors.assignee?.message}</p>
        </div>

        {/* Subject */}
        <div>
          <label className="text-sm">Subject</label>
          <input {...register("subject")} className="input" />
          <p className="error">{errors.subject?.message}</p>
        </div>

        {/* Performer */}
        <div>
          <label className="text-sm">Activity Performer</label>
          <input {...register("performer")} className="input" />
          <p className="error">{errors.performer?.message}</p>
        </div>

        {/* Impact */}
        <div>
          <label className="text-sm">Service Impact</label>
          <select {...register("impact")} className="input">
            <option value="" className="text-gray-600">Select Service Impact</option>
            {serviceImpactList.map((i) => (
              <option key={i} className="text-gray-600">{i}</option>
            ))}
          </select>
          <p className="error">{errors.impact?.message}</p>
        </div>

        {/* QCQAT 1 + 2 */}
        <div>
          <label className="text-sm">Select QCQAT 1</label>
          <select {...register("qc1")} className="input">
            <option value="" className="text-gray-600">Select QCQAT 1</option>
            {qcqat1List.map((q) => (
              <option key={q} className="text-gray-600">{q}</option>
            ))}
          </select>
          <p className="error">{errors.qc1?.message}</p>

          <label className="text-sm mt-3 block">Select QCQAT 2</label>
          <select {...register("qc2")} className="input">
            <option value="" className="text-gray-600">Select QCQAT 2</option>
            {qcqat2List.map((q) => (
              <option key={q} className="text-gray-600">{q}</option>
            ))}
          </select>
          <p className="error">{errors.qc2?.message}</p>
        </div>

        {/* Planned Start and End */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Planned Start Time</label>
            <input type="date" {...register("startTime")} className="input" />
            <p className="error">{errors.startTime?.message}</p>
          </div>
          <div>
            <label className="text-sm">Planned End Time</label>
            <input type="date" {...register("endTime")} className="input" />
            <p className="error">{errors.endTime?.message}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button type="button" className="px-4 py-2 bg-gray-600 rounded">
            Save as Draft
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-purple-600 rounded disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Tailwind reusable classes
// Add in global.css or keep here:
const styles = `
.input {
  @apply w-full bg-[#2b2d33] mt-1 p-3 rounded border border-gray-700 text-sm;
}
.error {
  @apply text-red-400 text-xs mt-1;
}
`;
