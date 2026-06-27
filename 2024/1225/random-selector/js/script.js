const shuffledNames = (members) => {
	for (let i = members.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[members[i], members[j]] = [members[j], members[i]];
	};

	let membersList = '';

	members.map((member) => {
		membersList += `<li>${member.name}</li>`; 
	});

	return membersList;
};

const showShuffledMembers = () => {
	const yokohamaMembersList = shuffledNames(yohohamaMembers);
	document.getElementById('yokohama-members-list').innerHTML = yokohamaMembersList;
	const kyotoMembersList = shuffledNames(kyotoMembers);
	document.getElementById('kyoto-members-list').innerHTML = kyotoMembersList;
};

setInterval(showShuffledMembers, 1000);

document.getElementById('yokohama-selected-members-list').innerHTML = '<li><h1>Yokohama R&D Center</h1></li>';
document.getElementById('kyoto-selected-members-list').innerHTML = `<li><h1>Kyoto R&D Center</h1></li>`;

let selection = 0;
let selectedMembers = [];

const selectRemoveMembers = (members) => {
	const randomIndex = Math.floor(Math.random() * members.length);
	selectedMembers.push({ team: members[randomIndex].team, name: members[randomIndex].name });
	members.splice(randomIndex, 1);
};

const fire = () => {
	confetti({ particleCount: 1000, spread: 360, origin: { y: 0.4 }, decay: 0.93, });
};

document.getElementById('select-button').addEventListener('click', () => {
	selection ++;
	if ( selection == 1 || selection === 2 ) {
		selectRemoveMembers(yohohamaMembers);
		let selectedMembersList = '<li><h1>Yokohama R&D Center</h1></li>';
		selectedMembers.map((member) => {
			selectedMembersList += `<li><span>${member.team}</span><h1>${member.name}</h1></li>`;
		});
		
		if ( selection === 1 ) {
			document.getElementById('audio1').play();
			setTimeout(() => {
				fire();
				document.getElementById('yokohama-selected-members-list').innerHTML = selectedMembersList;
			}, 5000);
		};
		
		if ( selection === 2 ) {
			document.getElementById('audio2').play();
			setTimeout(() => {
				fire();
				document.getElementById('yokohama-selected-members-list').innerHTML = selectedMembersList;
			}, 2000);
		};

	};

	if ( selection === 3 ) {
			selectRemoveMembers(kyotoMembers);
			let selectedMembersList = `<li><h1>Kyoto R&D Center</h1></li><li><span>${selectedMembers[2].team}</span><h1>${selectedMembers[2].name}</h1></li>`;
			document.getElementById('audio3').play();
			setTimeout(() => {
				fire();
				document.getElementById('kyoto-selected-members-list').innerHTML = selectedMembersList;
			}, 4000);
	};

	if ( selection > 5  ) {
		location.reload();
	};
});

document.getElementById('cancel-button').addEventListener('click', () => {
	if (selection <= 0 ) {
		selection = 0;
		return;
	};

	if ( selection == 1 || selection === 2 ) {
		selectedMembers.pop();
		let selectedMembersList = '<li><h1>Yokohama R&D Center</h1></li>';
		selectedMembers.map((member) => {
			selectedMembersList += `<li><span>${member.team}</span><h1>${member.name}</h1></li>`;
		});
		document.getElementById('yokohama-selected-members-list').innerHTML = selectedMembersList;
	};
	
	if ( selection === 3 ) {
		selectedMembers.pop();
		let selectedMembersList = `<li><h1>Kyoto R&D Center</h1></li>`;
		document.getElementById('kyoto-selected-members-list').innerHTML = selectedMembersList;
	};

	selection --;	
});
