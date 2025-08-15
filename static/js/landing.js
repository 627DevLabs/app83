function openCVwindow() {  
  alert("Me and Team Compatriots")  
  fetch('/cvLand', {
    method: 'GET',   
  })  
  .catch(error => {
    alert('Submission failed. Try again.');
  });
}