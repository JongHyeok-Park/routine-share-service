class Calendar {
  constructor() {
    this.yearMonth = document.getElementById("year-month");
    this.calendarBody = document.getElementById("calendar-body");
    this.date = new Date();
    this.start = null;
    this.end = null;

    document.getElementById("month-increase-btn").addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() + 1);
      this.render();
    })

    document.getElementById("month-decrease-btn").addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() - 1);
      this.render();
    })
  }

  setDate(newDate) {
    this.date = new Date(newDate);
    this.render();
  }

  render() {
    const viewYear = this.date.getFullYear();
    const viewMonth = this.date.getMonth();

    this.yearMonth.innerHTML = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const prevLastDay = prevLast.getDay();
    const prevLastDate = prevLast.getDate();

    const thisLastDay = thisLast.getDay();
    const thisLastDate = thisLast.getDate();

    const prevDates = [];
    const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);    
    const nextDates = [];

    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        prevDates.unshift(prevLastDate - i);
      }
    }

    for (let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);

    const firstIndex = dates.indexOf(1);
    const lastIndex = dates.lastIndexOf(thisLastDate);

    this.calendarBody.innerHTML = "";
    let tableRow = document.createElement("tr");
    dates.forEach((date, i) => {
      
      if ((i + 1) % 7 == 1 && i > 0) {
        this.calendarBody.appendChild(tableRow);
        tableRow = document.createElement("tr");
      }
      const condition = i >= firstIndex && i <= lastIndex ? "this" : "other"
      let tableCell = `<td class="${condition} date" data-date="${date}"><span>${date}</span></td>`;
      tableRow.insertAdjacentHTML("beforeend", tableCell);
    })
    this.calendarBody.appendChild(tableRow);

    let calendarDates = [...document.getElementsByClassName("date")];
    calendarDates.forEach((element) => {
      element.addEventListener("click", (event) => {
        let target = event.currentTarget;
        if (this.start) {
          target.classList.add("active", "end");
        } else {
          target.classList.add("active", "start");
          this.start = new Date(`${this.date.getFullYear()}-${this.date.getMonth()}-${target.dataset.date}`);
          console.log(this.start);
        }
        
      })
    })
  }
}

let calendar = new Calendar();
calendar.render();