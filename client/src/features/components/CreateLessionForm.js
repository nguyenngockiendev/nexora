import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

import "react-toastify/dist/ReactToastify.css";

const CreateLession = ({
  navigate,
  register,
  handleSubmit,
  onSubmit,
  quiz,
  setQuiz,
  resource,
  setResource,
  addquiz,
  removeQuiz,
  loading,
  setVideoFile,
}) => {
  return (
    <CCard className="mx-4 shadow-sm border-0">
      <CCardBody className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h3 className="fw-bold mb-1">Create Lesson</h3>
          <p className="text-muted mb-0">
            Add new lesson content for this course
          </p>
        </div>

        <CForm onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Lesson Title</label>
            <CInputGroup>
              <CInputGroupText>📘</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Enter lesson title"
                required
                {...register("title")}
              />
            </CInputGroup>
          </div>

          {/* Video URL */}
          <div className="mb-3">
            <label className="form-label">Video URL</label>
            <CInputGroup>
              <CInputGroupText>🎥</CInputGroupText>
              <CFormInput
                type="file"
                placeholder="https://..."
                required
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setVideoFile(e.target.files[0]);
                }}
              />
            </CInputGroup>
          </div>

          {/* Duration + Order */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Duration (seconds)</label>
              <CInputGroup>
                <CInputGroupText>⏱</CInputGroupText>
                <CFormInput
                  type="number"
                  placeholder="300"
                  required
                  {...register("duration")}
                />
              </CInputGroup>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Order</label>
              <CInputGroup>
                <CInputGroupText>#</CInputGroupText>
                <CFormInput
                  type="number"
                  placeholder="1"
                  {...register("order")}
                  required
                />
              </CInputGroup>
            </div>
          </div>

          {/* Preview toggle */}
          <div className="mb-3 d-flex align-items-center gap-2">
            <CFormCheck {...register("isPreview")} />
            <span>Allow Preview</span>
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label">Content</label>
            <CFormTextarea
              rows={4}
              placeholder="Lesson description..."
              required
              {...register("content")}
            />
          </div>

          {/* Resources placeholder */}

          <CInputGroup>
            <CInputGroupText>Recouse</CInputGroupText>
            <CFormInput
              type="file"
              placeholder="PDF"
              onChange={(e) => {
                console.log(e.target.files[0]);
                console.log("Resource type:", e.target.files[0].name);
                setResource({
                  ...resource,
                  title: e.target.files[0].name,
                  url: e.target.files[0],
                });
              }}
            />
          </CInputGroup>

          {/* Quiz Builder */}
          <div className="mb-3 p-3 border rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-semibold">Quiz</div>

              <CButton
                type="button"
                color="primary"
                size="sm"
                onClick={addquiz}
              >
                + Add Question
              </CButton>
            </div>

            {/* Question block (no white bg) */}
            <div className="border rounded p-3 mb-3">
              {quiz?.map((q, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <CFormInput
                    className="mb-2"
                    placeholder="Enter question..."
                    value={q.question}
                    onChange={(e) => {
                      const newQuiz = [...quiz];
                      newQuiz[index].question = e.target.value;
                      setQuiz(newQuiz);
                    }}
                  />
                  {/* OPTIONS */}
                  {q.options.map((opt, i) => (
                    <CInputGroup className="mb-2" key={i}>
                      <CInputGroupText>
                        {["A", "B", "C", "D"][i]}
                      </CInputGroupText>

                      <CFormInput
                        value={opt}
                        onChange={(e) => {
                          const newQuiz = [...quiz];
                          newQuiz[index].options[i] = e.target.value;
                          setQuiz(newQuiz);
                        }}
                      />
                    </CInputGroup>
                  ))}

                  {/* EXPLANATION */}
                  <CFormTextarea
                    rows={2}
                    placeholder="Explanation (optional)"
                    value={q.explanation}
                  />
                  <CFormSelect
                    className="mb-2"
                    onChange={(e) => {
                      const newQuiz = [...quiz];
                      newQuiz[index].correctAnswer = e.target.value;
                      setQuiz(newQuiz);
                    }}
                  >
                    <option value="">Select correct answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </CFormSelect>
                  <div className="d-flex justify-content-end mt-2">
                    <CButton
                      type="button"
                      color="danger"
                      size="sm"
                      onClick={() => removeQuiz(index)}
                    >
                      Remove
                    </CButton>
                  </div>
                </div>
              ))}
            </div>

            <small className="text-muted">
              Add multiple questions before saving lesson
            </small>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2 mt-4">
            <CButton type="submit" color="primary" disabled={loading}>
             {loading ? "Saving..." : "Save Lesson"}
            </CButton>

            <CButton
              type="button"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};
export default CreateLession;
