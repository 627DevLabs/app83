let cellno = document.getElementById('cellno').innerText;
let email = document.getElementById('email').innerText;
document.getElementById('cellno').innerText = "";
document.getElementById('email').innerText = "";

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
      cellno: cellno,
      email: email,
      income: document.querySelector("#income")?.value
    },
    academics: [],
    work: [],
    hobbies: [],//document.querySelector("textarea[name='hobbies']")?.value,
    skills: [],//document.querySelector("textarea[name='skills']")?.value,
    referrals: [],//document.querySelector("textarea[name='referrals']")?.value
  };
  skilz = document.getElementsByClassName('skilz');
  for (let i = 0; i < skilz.length; i++) {
    if (skilz[i].value != "") {
      formData.skills.push({
        skill: skilz[i].value,
      });
    }
  }
  hobiz = document.getElementsByClassName('hobiz');
  for (let i = 0; i < hobiz.length; i++) {
    if (hobiz[i].value != "") {
      formData.hobbies.push({
        hobby: hobiz[i].value,
      });
    }
  }
  refz = document.getElementsByClassName('refz');
  for (let i = 0; i < refz.length; i++) {
    if (refz[i].value != "") {
      formData.referrals.push({
        referral: refz[i].value,
      });
    }
  }

  document.querySelectorAll(".qualigrid").forEach((el) => {
    formData.academics.push({
      qualification: el.querySelector("input[name^='qualix']")?.value,
      institution: el.querySelector("input[name^='instix']")?.value,
      year: el.querySelector("input.datepic3")?.value,
      attachment: el.querySelector("input[name^='attx']")?.value
    });
  });

  document.querySelectorAll(".empingrid").forEach((el) => {
    formData.work.push({
      employer: el.querySelector("input[name^='empix']")?.value,
      jobTitle: el.querySelector("input[name^='jobtit']")?.value,
      jobResp: el.querySelector("input[name^='resp']")?.value,
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
  modalOverlay.style.overflowY = 'auto';
  modalOverlay.id = 'customModalOverlay';

  const modalBox = document.createElement('div');
  modalBox.style.position = 'relative';
  modalBox.style.top = '5%';
  modalBox.style.left = '50%';
  modalBox.style.transform = 'translateX(-50%)';
  modalBox.style.width = '100%';
  modalBox.style.maxHeight = '90%';
  modalBox.style.overflowY = 'auto';
  modalBox.style.backgroundColor = '#fff';
  modalBox.style.padding = '10px';
  modalBox.style.borderRadius = '8px';
  modalBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

  const formattedHtml = formatDataAsHtml(formData);
  const contentContainer = document.createElement('div');
  contentContainer.id = 'prntCV';

  contentContainer.innerHTML = formattedHtml;

  const btnGroup = document.createElement('div');
  btnGroup.className = 'modal-buttons';
  btnGroup.innerHTML = `
    <button onclick="downloadSummary()">Download</button>
    <button onclick="printSummary()">Print</button>
    <button onclick="confirmSubmit()">Submit</button>
    <button onclick="document.body.removeChild(document.getElementById('customModalOverlay'))">Cancel</button>
  `;

  modalBox.appendChild(contentContainer);
  modalBox.appendChild(btnGroup);
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);
}


function buildResumeHTML(data, cellno, email) {
  let html = '';

  html += '<h5>🧍 Personal Details</h5><ul>';
  html += `<li><div class="uilab"><div class="perslab"><strong>Name</strong></div> ${data.personal.fname} ${data.personal.sname}</div></li>`;
  html += `<li><div class="uilab"><div class="perslab"><strong>Id/Passport</strong></div> ${data.personal.idno}</div></li>`;
  html += `<li><div class="uilab"><div class="perslab"><strong>H.Language</strong></div> ${data.personal.hlang}</div></li>`;
  //  html += `<li><div class="uilab"><div class="perslab"><strong>Other languages</strong></div> ${data.personal.hlang2}</div></li>`;
  html += `<li><div class="uilab"><div class="perslab"><strong>Employed?</strong></div> ${data.personal.empstat}</div></li>`;
  //  html += `<li><div class="uilab"><div class="perslab"><strong>Breadwinner</strong></div> ${data.personal.breadwinner}</div></li>`;
  //  html += `<li><div class="uilab"><div class="perslab"><strong>AvFaIncome</strong></div> ${data.personal.income}</div></li>`;
  //  html += `<li><div class="uilab"><div class="perslab"><strong>Phone no.</strong></div> ${cellno}</div></li>`;
  //  html += `<li><div class="uilab"><div class="perslab"><strong>Email</strong></div> ${email}</div></li>`;
  html += '</ul>';

  html += '<h5>🎓 Academic Records</h5><ul>';
  data.academics.forEach((item, idx) => {
    html += `<li><strong>Qualification ${idx + 1}:</strong> ${item.qualification}, ${item.institution}, ${item.year}, Attachment: ${item.attachment}</li>`;
  });
  html += '</ul>';

  html += '<h5>💼 Work Experience</h5><ul>';
  data.work.forEach((item, idx) => {
    html += `<li>Job ${idx + 1}: ${item.employer} - ${item.jobTitle}, Responsibilities: ${item.jobResp}, From: ${item.fromDate} To: ${item.toDate}</li>`;
  });
  html += '</ul>';

  html += '<h6>🎯 Hobbies</h6><ul>';
  data.hobbies.forEach((item, idx) => {
    html += `<li><strong>Hobby ${idx + 1}:</strong> ${item.hobby} </li>`;
  });
  html += '</ul>';

  html += '<h6>🛠️ Skills</h6><ul>';
  data.skills.forEach((item, idx) => {
    html += `<li><strong>Skill ${idx + 1}:</strong> ${item.skill} </li>`;
  });
  html += '</ul>';

  html += '<h6>📞 Referrals</h6><ul>';
  data.referrals.forEach((item, idx) => {
    html += `<li><strong>Referral ${idx + 1}:</strong> ${item.referral} </li>`;
  });
  html += '</ul>';

  return html;
}

// =====================
// MODAL INJECTION LOGIC
// =====================

function injectPrintModal() {
  if (document.getElementById('printModal')) return;

  const modalHTML = `
    <div id="printModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" onclick="closeModal()">✖</button>
        <div id="printArea"></div>
        <div class="modal-actions">
          <button onclick="window.print()">🖨️ Print</button>
        </div>
      </div>
    </div>
    <style>
      .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex; justify-content: center; align-items: center;
        z-index: 9999;
      }

      .modal-content {
        background: white;
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 2rem;
        border-radius: 8px;
        position: relative;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
      }

      .close-btn {
        position: absolute;
        top: 10px; right: 10px;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }

      .modal-actions {
        text-align: right;
        margin-top: 1rem;
      }

      @media print {
        body * {
          visibility: hidden;
        }
        #printModal, #printModal * {
          visibility: visible;
        }
        #printModal {
          position: static;
          width: 100%;
          height: auto;
          background: none;
        }
        .close-btn, .modal-actions {
          display: none;
        }
      }
    </style>
  `;
  const modalWrapper = document.createElement('div');
  modalWrapper.innerHTML = modalHTML;
  document.body.appendChild(modalWrapper);
}

function showPrintModal(htmlContent) {
  injectPrintModal();
  document.getElementById('printArea').innerHTML = htmlContent;
  document.getElementById('printModal').style.display = 'flex';

  const closeAfterPrint = () => {
    closeModal();
    window.removeEventListener('afterprint', closeAfterPrint);
  };
  window.addEventListener('afterprint', closeAfterPrint);
}


function closeModal() {
  const modal = document.getElementById('printModal');
  if (modal) modal.style.display = 'none';
}

function formatDataAsHtml(data) {
  /* This code snippet is generating HTML content based on the data collected from the form. Here's a
  breakdown of what it does: */
  //https://youtu.be/5WY8ApIA2Fk?list=RD5WY8ApIA2Fk

  //let html = `<div class="prntHeader"> ${data.personal[0]}</div>`;
  let fname = String(data.personal.fname).substring(0, 1).toLocaleUpperCase();
  let sname = String(data.personal.sname).substring(0, 1).toUpperCase();
  let html = `<div class="prntHeader"><div class="topinit">${fname}|${sname}</div></div>`;


  html += `<div class="topDivider"></div>`;

  html += `<div class="svg-grid-container">`;

  // Left column
  html += `<div class="left-column">`;

  // Personal Details
  html += `<div class="grid-item personal"><h5>🧍 Personal Details</h5><ul>`;
  html += `<div class="uilab"><div class="perslab">Name</div> ${data.personal.fname} ${data.personal.sname}</div>`;
  html += `<li><div class="uilab"><div class="perslab">Id/Pass No</div> ${data.personal.idno}</div></li>`;
  html += `<li><div class="uilab"><div class="perslab">Home Language</div> ${data.personal.hlang}</div></li>`;
  //  html += `<li><div class="uilab"><div class="perslab">Other languages</div> ${data.personal.hlang2}</div></li>`;
  //   html += `<li><div class="uilab"><div class="perslab">Employed?</div> ${data.personal.empstat}</div></li>`;
  //   html += `<li><div class="uilab"><div class="perslab">Breadwinner</div> ${data.personal.breadwinner}</div></li>`;
  //   html += `<li><div class="uilab"><div class="perslab">AvFaIncome</div> ${data.personal.income}</div></li>`;
  //   html += `<li><div class="uilab"><div class="perslab">Phone no.</div> ${cellno}</div></li>`;
  //   html += `<li><div class="uilab"><div class="perslab">Email</div> ${email}</div></li>`;
  html += `</ul></div>`;

  // Hobbies
  html += `<div class="grid-item hobbies"><h5>🎯 Hobbies</h5><ul>`;
  data.hobbies.forEach((item, idx) => {
    html += `<li><strong>Hobby ${idx + 1}:</strong> ${item.hobby}</li>`;
  });
  html += `</ul></div>`;

  // Skills
  html += `<div class="grid-item skills"><h5>🛠️ Skills</h5><ul>`;
  data.skills.forEach((item, idx) => {
    html += `<li><strong>Skill ${idx + 1}:</strong> ${item.skill}</li>`;
  });
  html += `</ul></div>`;

  // Referrals
  html += `<div class="grid-item referrals"><h5>📞 Referrals</h5><ul>`;
  data.referrals.forEach((item, idx) => {
    html += `<li><strong>Referral ${idx + 1}:</strong> ${item.referral}</li>`;
  });
  html += `</ul></div>`;

  html += `</div>`; // End left column


  // Right column
  html += `<div class="right-column">`;

  // Academics
  // Academics


  html += `<div class="grid-item academics">`;
  html += `<h5>🎓 Academic Records</h5>`;

  // Start table
  html += `<table style="width:100%; border-collapse: collapse;">`;
  html += `<thead>
            <tr>
              <th style="border-bottom: 2px solid #ccc; padding: 8px; text-align:left;">Qualifications</th>
              <th style="border-bottom: 2px solid #ccc; padding: 8px; text-align:left;">Institution</th>
            
            </tr>
         </thead>`;
  html += `<tbody>`;

  // Table rows from data
  data.academics.forEach((item) => {
    html += `<tr>
            <td style="border-bottom: 1px solid #eee; padding: 8px;">${item.qualification}</td>
            <td style="border-bottom: 1px solid #eee; padding: 8px;">${item.institution}</td>
           
           </tr>`;
    html += `<tr>
            <td colspan="3" style="border-bottom: 1px solid #eee; padding: 8px; color:#555;">
              <strong>Year:</strong> ${item.year} 
            </td>
           </tr>`;
  });

  html += `</tbody>`;
  html += `</table>`;
  html += `</div>`;






  // Work
  html += `<div class="grid-item work">`;
  html += `<h5>💼 Work Experience</h5>`;

  // Start table
  html += `<table style="width:100%; border-collapse: collapse;">`;
  html += `<thead>
            <tr>
             
              <th style="width: 100px; border-bottom: 2px solid #ccc; padding: 8px; text-align:center;">
                Job Title
            </th>
             <th style="width: 100px; border-bottom: 2px solid #ccc; padding: 8px; text-align:left;">
                Employer
            </th> 
             <th style="width: 100px; border-bottom: 2px solid #ccc; padding: 8px; text-align:center;">
                From
            </th>
             <th style="width: 100px; border-bottom: 2px solid #ccc; padding: 8px; text-align:center;">
                To
            </th>
            </tr>
         </thead>`;
  html += `<tbody>`;

  // Table rows from data
  data.work.forEach((item) => {
    // Main row
    html += `<tr>
            <td style="border-bottom: 1px solid #eee; padding: 8px;">${item.jobTitle}</td>
            <td style="border-bottom: 1px solid #eee; padding: 8px;">${item.employer}</td>
            <td style="border-bottom: 1px solid #eee; padding: 8px; text-align:center;">${item.fromDate}</td>
            <td style="border-bottom: 1px solid #eee; padding: 8px; text-align:center;">${item.toDate}</td>
           </tr>`;

    // Second row for dates
    html += `<tr>
            <td colspan="3" style="border-bottom: 1px solid #eee; padding: 8px; color:#555;">
              <strong>Responsibilities:</strong> ${item.jobResp} 
            </td>
           </tr>
           <tr>
  <td colspan="3" style="height: 1px; background-color: #ddd; padding: 0;"></td>
</tr>`;
  });

  html += `</tbody>`;
  html += `</table>`;
  html += `</div>`;

  html += `</ul></div>`;

  html += `</div>`; // End right column

  html += `</div>`; // End grid container

  return html;

}
function downloadSummary() {
  const originalElement = document.getElementById("prntCV");

  // Clone node to avoid affecting UI
  const clone = originalElement.cloneNode(true);
  clone.id = "prntCV_clone";
  clone.classList.add("force-desktop");

  // Apply fixed A4 sizing for the clone
  clone.style.width = "2480px";
  clone.style.height = "3508px";
  clone.style.position = "absolute";
  clone.style.left = "-9999px"; // hide off-screen
  clone.style.top = "0";
  clone.style.padding = "0";
  clone.style.margin = "0";

  document.body.appendChild(clone);

  html2canvas(clone, {
    scale: 2,
    useCORS: true,
    width: 2480,
    height: 3508,
    windowWidth: 2480,
    windowHeight: 3508
  }).then((contentCanvas) => {
    // Remove clone after rendering
    document.body.removeChild(clone);

    // Create a new blank A4 canvas
    const a4Width = 2480;
    const a4Height = 3508;
    const a4Canvas = document.createElement("canvas");
    a4Canvas.width = a4Width;
    a4Canvas.height = a4Height;

    const ctx = a4Canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, a4Width, a4Height);

    // ✅ Put capture at 0,0 without scaling/stretching
    ctx.drawImage(contentCanvas, 0, 0);

    // Download
    const link = document.createElement("a");
    link.download = "summary_a4.png";
    link.href = a4Canvas.toDataURL("image/png");
    link.click();
  });
}




// function downloadSummary() {
//   const originalElement = document.getElementById("prntCV");

//   // Force desktop layout
//   originalElement.classList.add("force-desktop");

//   // Optional: scale to fit A4
//   const scaleFactor = Math.min(2480 / originalElement.scrollWidth, 3508 / originalElement.scrollHeight);
//   originalElement.style.transform = `scale(${scaleFactor})`;

//   html2canvas(originalElement, { scale: 2, useCORS: true }).then((contentCanvas) => {
//     // Remove transform after capture
//     originalElement.style.transform = '';
//     originalElement.classList.remove("force-desktop");

//     const a4Width = 2480;
//     const a4Height = 3508;
//     const a4Canvas = document.createElement("canvas");
//     a4Canvas.width = a4Width;
//     a4Canvas.height = a4Height;

//     const ctx = a4Canvas.getContext("2d");
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, a4Width, a4Height);

//     // Center the content
//     const x = (a4Width - contentCanvas.width) / 2;
//     ctx.drawImage(contentCanvas, x, 0);

//     const link = document.createElement("a");
//     link.download = "summary_a4.png";
//     link.href = a4Canvas.toDataURL("image/png");
//     link.click();
//   });
// }


// function downloadSummary() {
//   const originalElement = document.getElementById("prntCV");

//   // Step 1: Take screenshot of the actual content
//   html2canvas(originalElement, { scale: 2, useCORS: true }).then((contentCanvas) => {
//     // Step 2: Create a temporary A4 container
//     const a4Width = 2480; // px at 300 DPI
//     const a4Height = 3508; // px at 300 DPI
//     const a4Canvas = document.createElement("canvas");
//     a4Canvas.width = a4Width;
//     a4Canvas.height = a4Height;

//     // Step 3: Draw white background
//     const ctx = a4Canvas.getContext("2d");
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, a4Width, a4Height);

//     // Step 4: Calculate centering for the screenshot
//     const x = (a4Width - contentCanvas.width) / 2;
//     const y = (a4Height - contentCanvas.height) / 2;
//     ctx.drawImage(contentCanvas, 0, 0);

//     // Step 5: Download as PNG
//     const link = document.createElement("a");
//     link.download = "summary_a4.png";
//     link.href = a4Canvas.toDataURL("image/png");
//     link.click();
//   });
// }


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

