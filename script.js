const currentVersion = '1.0.1';
const versionType = 'Public';
const checkFail = 'Version verification unsuccessful';
const vChecker = 'Checking for updates...';
const loadTime = 4000;
const fileType = 'lua';
const apiUrl = 'https://api.github.com/repos/SkyHighModifications/VEHICLENAMESGENERATOR/releases/latest';
const loadingScreen = true;

let vehicleCount = 1;
  const vehicles = new Map();

  function deleteVehicleInput() {
    if (vehicleCount > 1) {
      const vehicleInputs = document.getElementById('vehicle-inputs');
      vehicleInputs.removeChild(vehicleInputs.lastChild);
      vehicleCount--;
      vehicles.delete(vehicleCount);
    } else {
      alert('You must have at least one vehicle.');
    }
    if (vehicleCount === 1) {
        document.getElementById('lua-output').style.display = 'none';
    }
  }

  function addVehicleInput() {
    vehicleCount++;
    const vehicleInputs = document.getElementById('vehicle-inputs');
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    inputGroup.innerHTML = `
      <button class="btn-danger" onclick="deleteVehicleInput()">Delete Vehicle</button>
      <label for="spawnName${vehicleCount}">Spawn Code</label>
      <input type="text" id="spawnName${vehicleCount}" placeholder="Enter vehicle spawn code">
      <label for="displayName${vehicleCount}">Real Display Name</label>
      <input type="text" id="displayName${vehicleCount}" placeholder="Enter real vehicle display name">
    `;
    vehicleInputs.appendChild(inputGroup);
  }

  function generateLua() {
    let luaCode = 'Citizen.CreateThread(function()\n\n';
    vehicles.clear();

    for (let i = 1; i <= vehicleCount; i++) {
      const displayName = document.getElementById(`displayName${i}`).value;
      const spawnName = document.getElementById(`spawnName${i}`).value;
      if (displayName && spawnName) {
        if (vehicles.has(spawnName)) {
          alert(`Vehicle with spawn name "${spawnName}" already exists.`);
          return;
        }
        vehicles.set(spawnName, true);
        luaCode += `  AddTextEntry('${spawnName}', '${displayName}')\n`;
      }
    }
    luaCode += 'end)\n\n-- Made with VEHICLE NAMES GENERATOR by Code Master';

    document.getElementById('lua-output').style.display = 'block';
    document.getElementById('lua-code').innerText = luaCode;
  }

  function downloadLua() {
    const luaCode = document.getElementById('lua-code').innerText;
    const blob = new Blob([luaCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicleNames.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const token = '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';

$(document).ready(function() {
    $('.container').addClass('flash2');
    fetch(apiUrl, {
        headers: {
            Authorization: `token ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        $('#versionNumber').html(vChecker);
        setTimeout(() => {
            const latestVersion = data.tag_name.replace('v', ''); 

            if (compareVersions(currentVersion, latestVersion) === 0) {
                $('#versionNumber').html(`<span style="color: #18FC03; cursor: pointer; font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 16px;" title="Up to date - 23/05/2024 : 09:57AM"></span>V ${currentVersion} ${versionType}`);
            } else if (compareVersions(currentVersion, latestVersion) < 0) {
                $('#versionNumber').html(`<span style='animation: flash 1.5s infinite; color: #FFA500; cursor: pointer; font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 16px;' title='Update Needed - Waiting for owner to update!''></span>V ${currentVersion} ${versionType}`);
                $('#versionNumber').click(function() {
                    window.open(data.html_url, '_blank');
                });
            } else if (compareVersions(currentVersion, latestVersion) > 0) {
                $('#versionNumber').html(`<span style=' color:red; font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 16px;' title='Outdated''></span>V ${currentVersion} ${versionType}`);
            }
        }, 8000);
    })
    .catch(error => {
        console.error('Error fetching latest release:', error);
    });
});

function compareVersions(a, b) {
    const partsA = a.split('.');
    const partsB = b.split('.');
    const maxLength = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < maxLength; i++) {
        const numA = parseInt(partsA[i] || '0');
        const numB = parseInt(partsB[i] || '0');

        if (numA !== numB) {
            return numA - numB;
        }
    }

    return 0;
}

document.cookie = "name=value; SameSite=Strict";

setTimeout(function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loader2").style.display = "none";
    document.getElementById("loading-text").style.display = "none";
    document.getElementById("loading-text2").style.display = "none";
    document.getElementById("loading-text3").style.display = "none";
    document.getElementById("copyright2").style.display = "none";
    document.getElementById("content").style.display = "block";
}, loadTime);

document.addEventListener("DOMContentLoaded", function() {
window.onload = function() {
    document.body.scrollTop = 0;
};

var loadingProgress = document.getElementById('loading-progress2');     
var duration = loadTime;
var start = 0;
var end = 100;
var range = end - start;
var current = start;
var increment = end > start ? 1 : -1;
var stepTime = Math.abs(Math.floor(duration / range));
var stepTime2 = 10 * Math.abs(Math.floor(duration / range));

function animateLoading() {
    var timer = setInterval(function() {
        if (current > 60 && current < 70) {
            setTimeout(function() {
                current += increment;
                loadingProgress.textContent = current;
            }, stepTime2);
        } else {
            current += increment;
            loadingProgress.textContent = current;
        }

        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

animateLoading();
});

if (loadingScreen) {
    document.getElementById("content").style.display = "none";
} else {
    document.getElementById("content").style.display = "block";
}