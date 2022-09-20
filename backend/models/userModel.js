const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  pic: {
    type: String,
    default:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cGF0aCBkPSJtMzc2IDE2NS41MmMtNTUuODAxIDAuMDYyNS0xMDkuMyAyMi4yNTgtMTQ4Ljc2IDYxLjcxOS0zOS40NjEgMzkuNDU3LTYxLjY1NiA5Mi45NjEtNjEuNzE5IDE0OC43Ni0wLjIxNDg0IDQ4LjUwNCAxNi41NTkgOTUuNTUxIDQ3LjQxIDEzMi45NyAxOS42OCAyNC4yNjYgNDQuNTM5IDQzLjgxNiA3Mi43NTQgNTcuMjMgMjguMjE5IDEzLjQxIDU5LjA3OCAyMC4zNCA5MC4zMTYgMjAuMjc3IDMuOTcyNyAwIDcuOTI1OC0wLjEwOTM4IDExLjg1OS0wLjMyODEyaDAuMDAzOTA2YzU0LjcwNy0zLjA4NTkgMTA2LjA1LTI3LjM4NyAxNDMuMTMtNjcuNzM4IDM3LjA3NC00MC4zNTIgNTYuOTQ5LTkzLjU2NiA1NS40MDYtMTQ4LjM0LTEuNTQ2OS01NC43NzMtMjQuMzkxLTEwNi43OS02My42OC0xNDQuOTgtMzkuMjg5LTM4LjE5NS05MS45MjYtNTkuNTY2LTE0Ni43Mi01OS41NjZ6bTAgMzQuMTMzYzQ2Ljc1OCAwLjA1NDY4NyA5MS41ODIgMTguNjQ4IDEyNC42NCA1MS43MTEgMzMuMDYyIDMzLjA1OSA1MS42NTYgNzcuODgzIDUxLjcxMSAxMjQuNjQgMC4xMTcxOSAzNC4yMy05Ljg4MjggNjcuNzI3LTI4Ljc0NiA5Ni4yODktNDAuNTctMzYuMzU5LTkzLjEyOS01Ni40NjktMTQ3LjYxLTU2LjQ2OS01NC40NzcgMC4wMDM5MDctMTA3LjA0IDIwLjEwOS0xNDcuNiA1Ni40NjktMTguODYzLTI4LjU1OS0yOC44NjMtNjIuMDU5LTI4Ljc0Ni05Ni4yODkgMC4wNTQ2ODctNDYuNzU0IDE4LjY0OC05MS41NzggNTEuNzExLTEyNC42NCAzMy4wNTktMzMuMDYyIDc3Ljg4My01MS42NTYgMTI0LjY0LTUxLjcxMXptLTE4Ljg3OSAzNTEuNjVjLTIuMDQ2OS0wLjIxODc1LTQuMDQzLTAuNjMyODEtNi4wNzAzLTAuOTIxODgtNC4xNTIzLTAuNTg5ODQtOC4zMDA4LTEuMjAzMS0xMi4zNzUtMi4wODItMi4zNzExLTAuNTExNzItNC42ODc1LTEuMTkxNC03LjAyNzMtMS43OTY5LTMuNjY0MS0wLjk0OTIyLTcuMzIwMy0xLjkyNTgtMTAuOTA2LTMuMTA5NC0yLjQxMDItMC43OTI5Ny00Ljc2NTYtMS43MTQ4LTcuMTMyOC0yLjYwOTQtMy40MTgtMS4yOTMtNi44MDg2LTIuNjQ0NS0xMC4xMzMtNC4xNDg0LTIuMzQ3Ny0xLjA1ODYtNC42NTYyLTIuMjAzMS02Ljk1MzEtMy4zNjMzLTMuMjMwNS0xLjYzNjctNi40MTAyLTMuMzcxMS05LjUzOTEtNS4yMDMxLTIuMjE4OC0xLjMwMDgtNC40MTgtMi42MzY3LTYuNTc4MS00LjAzOTEtMy4wODItMS45OTYxLTYuMDgyLTQuMTI1LTkuMDM5MS02LjMyMDMtMi4wMzEyLTEuNTA3OC00LjA3MDMtMy02LjAzOTEtNC41OTc3LTIuOTYwOS0yLjM5ODQtNS43OTY5LTQuOTY0OC04LjYwOTQtNy41NjY0LTEuNzg1Mi0xLjY1MjMtMy42MDk0LTMuMjQ2MS01LjMzMi00Ljk3NjYtMC41NTQ2OS0wLjU1NDY5LTEuMDQ2OS0xLjE4MzYtMS41ODk4LTEuNzVsLTAuMDA3ODEzIDAuMDA3ODEzYzM0LjUxNi0zMS40NDUgNzkuNTI3LTQ4Ljg3MSAxMjYuMjEtNDguODcxIDQ2LjY5MSAwIDkxLjY5OSAxNy40MyAxMjYuMjEgNDguODcxLTAuNTM1MTYgMC41NTA3OC0xLjAxNTYgMS4xNjgtMS41NTg2IDEuNzEwOS0xLjc4NTIgMS43OTMtMy42NzU4IDMuNDUzMS01LjUyNzMgNS4xNjAyLTIuNzQ2MSAyLjUzNTItNS41MTE3IDUuMDM1Mi04LjM5ODQgNy4zNzg5LTIuMDIzNCAxLjY0MDYtNC4xMTMzIDMuMTc1OC02LjE5OTIgNC43MjI3LTIuOTA2MiAyLjE1MjMtNS44NDc3IDQuMjM4My04Ljg3NSA2LjE5OTItMi4yMDMxIDEuNDI5Ny00LjQ0MTQgMi43ODkxLTYuNzAzMSA0LjExNzItMy4wODU5IDEuODA4Ni02LjIyMjcgMy41MTk1LTkuNDE0MSA1LjEzMjgtMi4zMjgxIDEuMTc5Ny00LjY3MTkgMi4zMzU5LTcuMDUwOCAzLjQxMDItMy4yOTY5IDEuNDg4My02LjY2MDIgMi44MjgxLTEwLjA0NyA0LjEwOTQtMi4zOTA2IDAuOTAyMzQtNC43Njk1IDEuODMyLTcuMTk5MiAyLjYzMjgtMy41NzQyIDEuMTc1OC03LjIyMjcgMi4xNTIzLTEwLjg3OSAzLjA5NzctMi4zNDM4IDAuNjA5MzgtNC42NjQxIDEuMjg5MS03LjAzOTEgMS44MDA4LTQuMDY2NCAwLjg3NS04LjIwMzEgMS40ODgzLTEyLjM0OCAyLjA3ODEtMi4wMzkxIDAuMjg5MDYtNC4wNTA4IDAuNzA3MDMtNi4xMDU1IDAuOTI1NzgtMTIuNTQzIDEuMzk4NC0yNS4yMDcgMS4zOTg0LTM3Ljc1IDB6Ii8+CiAgPHBhdGggZD0ibTM3NiAzOTMuMDdjMjAuMzUyLTAuODA0NjkgMzkuNTU1LTkuNjMyOCA1My40MTQtMjQuNTU5IDEzLjg1OS0xNC45MjIgMjEuMjQyLTM0LjcyNyAyMC41MzktNTUuMDgyIDAuNzAzMTItMjAuMzU1LTYuNjc5Ny00MC4xNTYtMjAuNTM5LTU1LjA4Mi0xMy44NTktMTQuOTI2LTMzLjA2Mi0yMy43NTQtNTMuNDE0LTI0LjU1OS0yMC4zNDggMC44MDQ2OS0zOS41NTEgOS42MzI4LTUzLjQxIDI0LjU1OXMtMjEuMjQyIDM0LjcyNy0yMC41MzkgNTUuMDgyYy0wLjcwMzEyIDIwLjM1NSA2LjY3OTcgNDAuMTYgMjAuNTM5IDU1LjA4MiAxMy44NTkgMTQuOTI2IDMzLjA2MiAyMy43NTQgNTMuNDEgMjQuNTU5em0wLTEyNS4xNXYwLjAwMzkwN2MxMS4yOTMgMC44MTY0MSAyMS44MDkgNi4wNTA4IDI5LjI2MiAxNC41NyA3LjQ1NyA4LjUyMzQgMTEuMjUgMTkuNjM3IDEwLjU1OSAzMC45MzggMC42OTE0MSAxMS4zMDEtMy4xMDE2IDIyLjQxOC0xMC41NTkgMzAuOTM4LTcuNDUzMSA4LjUxOTUtMTcuOTY5IDEzLjc1NC0yOS4yNjIgMTQuNTctMTEuMjg5LTAuODE2NDEtMjEuODA1LTYuMDUwOC0yOS4yNTgtMTQuNTctNy40NTctOC41MTk1LTExLjI1LTE5LjYzNy0xMC41NjItMzAuOTM4LTAuNjg3NS0xMS4zMDEgMy4xMDU1LTIyLjQxNCAxMC41NjItMzAuOTM4IDcuNDUzMS04LjUxOTUgMTcuOTY5LTEzLjc1NCAyOS4yNTgtMTQuNTd6Ii8+CiA8L2c+Cjwvc3ZnPgo=",
  },
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;