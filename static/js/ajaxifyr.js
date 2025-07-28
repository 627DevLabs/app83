
function collectFormData() {
  const formData = {
    personal: {
      fname: document.querySelector("input[name='fname']")?.value,
      sname: document.querySelector("input[name='sname']")?.value,
      idno: document.querySelector("input[name='idno']")?.value,
      hlang: document.querySelector("input[name='hlang']")?.value,
      hlang2: document.querySelector("input[name='hlang2']")?.value,
      empstat: document.querySelector("#empstat")?.value,
      breadwinner: document.querySelector("#breadqinner")?.value,
      income: document.querySelector("#income")?.value
    },
    academics: [],
    work: []
  };

  document.querySelectorAll(".qualigrid").forEach((el) => {
    formData.academics.push({
      qualification: el.querySelector("input[name^='qualix']")?.value,
      institution: el.querySelector("input[name^='instix']")?.value,
      year: el.querySelector("input[name^='yobtx']")?.value,
      attachment: el.querySelector("input[name^='attx']")?.value
    });
  });

  document.querySelectorAll(".empingrid").forEach((el) => {
    formData.work.push({
      employer: el.querySelector("input[name^='empix']")?.value,
      jobTitle: el.querySelector("input[name^='jobtit']")?.value,
      jobResp: el.querySelector("input[name^='jobtitle']")?.value,
      fromDate: el.querySelector("input.datepic1")?.value,
      toDate: el.querySelector("input.datepic2")?.value
    });
  });

  return formData;
}

function openModal() {
  const formData = collectFormData();
  const modalOverlay = document.createElement('div');
  modalOverlay.style.position = 'fixed';
  modalOverlay.style.top = 0;
  modalOverlay.style.left = 0;
  modalOverlay.style.width = '100%';
  modalOverlay.style.height = '100%';
  modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
  modalOverlay.style.zIndex = 9999;
  modalOverlay.id = 'customModalOverlay';

  const modalBox = document.createElement('div');
  modalBox.style.position = 'fixed';
  modalBox.style.top = '10%';
  modalBox.style.left = '50%';
  modalBox.style.transform = 'translateX(-50%)';
  modalBox.style.width = '80%';
  modalBox.style.maxHeight = '80%';
  modalBox.style.overflowY = 'auto';
  modalBox.style.backgroundColor = '#fff';
  modalBox.style.padding = '20px';
  modalBox.style.borderRadius = '8px';
  modalBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

  const content = document.createElement('div');

  content.innerHTML = `
    <div class="section-title"><i>👤</i> Personal Details</div>
    <ul>
      <li><b>First Name:</b> ${formData.personal.fname}</li>
      <li><b>Surname:</b> ${formData.personal.sname}</li>
      <li><b>ID Number:</b> ${formData.personal.idno}</li>
      <li><b>Home Language:</b> ${formData.personal.hlang}</li>
      <li><b>Second Language:</b> ${formData.personal.hlang2}</li>
      <li><b>Employment Status:</b> ${formData.personal.empstat}</li>
      <li><b>Breadwinner:</b> ${formData.personal.breadwinner}</li>
      <li><b>Monthly Income:</b> ${formData.personal.income}</li>
    </ul>

    <div class="section-title"><i>🎓</i> Academic Details</div>
    <ul>
      ${formData.academics.map(a => `<li><b>${a.qualification}</b> at ${a.institution} (${a.year}) - Attachment: ${a.attachment}</li>`).join('')}
    </ul>

    <div class="section-title"><i>💼</i> Work Experience</div>
    <ul>
      ${formData.work.map(w => `<li><b>${w.jobTitle}</b> at ${w.employer} (${w.fromDate} - ${w.toDate})<br>${w.jobResp}</li>`).join('')}
    </ul>
  `;

  const btnGroup = document.createElement('div');
  btnGroup.style.marginTop = '20px';
  btnGroup.innerHTML = `
    <button onclick="downloadSummary()">Download</button>
    <button onclick="printSummary()">Print</button>
    <button onclick="confirmSubmit()">Submit</button>
    <button onclick="document.body.removeChild(document.getElementById('customModalOverlay'))">Cancel</button>
  `;

  modalBox.appendChild(content);
  modalBox.appendChild(btnGroup);
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);
}

function downloadSummary() {
  const formData = collectFormData();
  const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'form_summary.json';
  a.click();
  URL.revokeObjectURL(url);
}

function printSummary() {
  window.print();
}

function confirmSubmit() {
  const formData = collectFormData();
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    alert('Form submitted successfully!');
    document.body.removeChild(document.getElementById('customModalOverlay'));
  })
  .catch(error => {
    alert('Submission failed. Try again.');
  });
}

