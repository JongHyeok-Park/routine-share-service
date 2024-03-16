class SearchResult extends Observer{
  constructor() {
    super();
    this.groupInfo = [];
    this.searchRoutineContainer = document.querySelector('.search-routine-container');
    this.colors = ["#5A189A", "#7B2CBF", "#9D4EDD", "#C77DFF", "#C8B6FF", "#D9ED92", "#DDE7C7", "#B5E48C", "#9747FF", "#E0AAFF"];
  }

  getGroupInfo() {
    return this.groupInfo;
  }

  setGroupInfo(groups) {
    this.groupInfo = groups.map((group) => ({ ...group }));
  }

  render() {
    this.searchRoutineContainer.innerHTML = '';

    this.groupInfo.forEach((group) => {
      let chk = false;
      const searchRoutineWrapper = document.createElement('div');
      searchRoutineWrapper.classList.add('search-routine-wrapper');

      const randomIndex = Math.floor(Math.random() * this.colors.length);
      const randomColor = this.colors[randomIndex];

      searchRoutineWrapper.style.backgroundColor = randomColor;

      let groupName = "";
      if (group.name.length > 7) {
        chk = true;
        for (let i = 0; i < 7; i++) {
          groupName += group.name[i]
        }
        groupName += "..";        
      }

      searchRoutineWrapper.innerHTML = `
        <div class="routine">
          <span class="routine-participants">${group.participants}명</span>
          <span class="routine-name">${chk ? groupName : group.name}</span>
        </div>
      `;

      const routineParticipant = searchRoutineWrapper.querySelector('.routine-participants');
      routineParticipant.style.color = randomColor;

      this.searchRoutineContainer.appendChild(searchRoutineWrapper);
      
    });
  }
}