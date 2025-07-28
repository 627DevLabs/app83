let latestFormData = {};

function gatherFormData() {
  const data = {
    personal: {
      fname: document.querySelector('input[name="fname"]').value,
      sname: document.querySelector('input[name="sname"]').value,
      idno: document.querySelector('input[name="idno"]').value,
      hlang: document.querySelector('input[name="hlang"]').value,
      hlang2: document.querySelector('input[name="hlang2"]').value,
      empstat: document.querySelector('#empstat').value,
      breadwinner: document.querySelector('#breadqinner').value,
      income: document.querySelector('#income').value
    },
    driving: {
      licence: document.querySelectorAll('.frm')[1].querySelectorAll('select')[0].value,
      experience: document.querySelectorAll('.frm')[1].querySelectorAll('select')[1].value
    },
    skills: {
      skilli1: document.querySelector('input[name="skilli1"]').value,
      skilli2: document.querySelector('input[name="skilli2"]').value,
      skilli3: document.querySelector('input[name="skilli3"]').value,
      skilli4: document.querySelector('input[name="skilli4"]').value,
      skilli5: document.querySelector('input[name="skilli5"]').value
    },
    hobbies: {
      hobbi1: document.querySelector('input[name="hobbi1"]').value,
      hobbi2: document.querySelector('input[name="hobbi2"]').value,
      hobbi3: document.querySelector('input[name="hobbi3"]').value,
      hobbi4: document.querySelector('input[name="hobbi4"]').value,
      hobbi5: document.querySelector('input[name="hobbi5"]').value
    },
    referrals: {
      referal1: document.querySelector('#Referal1').value,
      referal2: document.querySelector('#Referal2').value,
      referal3: document.querySelector('#Referal3').value,
      referal4: document.querySelector('#Referal4').value,
      referal5: document.querySelector('#Referal5').value
    }
  };
  return data;
}

function generateSummary(data) {
  let summary = `👤 Personal Info:\n`;
  summary += `- First Name: ${data.personal.fname}\n`;
  summary += `- Surname: ${data.personal.sname}\n`;
  summary += `- ID Number: ${data.personal.idno}\n`;
  summary += `- Home Language: ${data.personal.hlang}\n`;
  summary += `- Other Language: ${data.personal.hlang2}\n`;
  summary += `- Employed?: ${data.personal.empstat}\n`;
  summary += `- Breadwinner?: ${data.personal.breadwinner}\n`;
  summary += `- Household Income: ${data.personal.income}\n\n`;

  summary += `🚗 Driving:\n`;
  summary += `- Licence Code: ${data.driving.licence}\n`;
  summary += `- Experience: ${data.driving.experience}\n\n`;

  summary += `🛠️ Skills:\n`;
  for (let i = 1; i <= 5; i++) {
    const val = data.skills[`skilli${i}`];
    if (val) summary += `- ${val}\n`;
  }

  summary += `\n🎯 Hobbies:\n`;
  for (let i = 1; i <= 5; i++) {
    const val = data.hobbies[`hobbi${i}`];
    if (val) summary += `- ${val}\n`;
  }

  summary += `\n👥 Referrals:\n`;
  for (let i = 1; i <= 5; i++) {
    const val = data.referrals[`referal${i}`];
    if (val) summary += `- ${val}\n`;
  }

  return summary;
}

function submitForm() {
  latestFormData = gatherFormData();
  const summaryText = generateSummary(latestFormData);
  document.getElementById("modalSummaryText").innerText = summaryText;
  document.getElementById("summaryModal").style.display = "block";
}

function closeModal() {
  document.getElementById("summaryModal").style.display = "none";
}

function confirmSubmit() {
  fetch("/submit_form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(latestFormData)
  })
    .then((res) => res.json())
    .then((res) => {
      alert("✅ Submitted successfully!");
      closeModal();
    })
    .catch((err) => {
      alert("❌ Submission failed.");
      console.error(err);
    });
}

function printSummary() {
  const printContent = document.getElementById("modalSummaryText").innerText;
  const newWindow = window.open("", "", "width=600,height=600");
  newWindow.document.write(`<pre>${printContent}</pre>`);
  newWindow.document.close();
  newWindow.print();
}

function downloadSummary() {
  const json = JSON.stringify(latestFormData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "form_summary.json";
  a.click();
  URL.revokeObjectURL(url);
}

