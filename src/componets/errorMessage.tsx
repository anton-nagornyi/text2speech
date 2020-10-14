export class ErrorMessage
{
    static timeout = 0;
    static _errorMsg = "";

    static error(message: string): void
    {
        if (this.timeout !== 0)
        {
            this._errorMsg = `${this._errorMsg}<br/>${message}`;
        }
        else
        {
            this._errorMsg = message;
        }
        clearTimeout(this.timeout);

        let e = document.getElementById("ErrorMessage.error");
        if (!e)
        {
            e = document.createElement("div");
            e.id = "ErrorMessage.error";
            e.style.position = "absolute";
            e.style.width = "100%";
            e.style.top = "70px";
            e.style.textAlign = "center";
            e.style.color = "red";
            document.body.appendChild(e);
        }
        e!.style.display = "block";
        e.innerHTML = this._errorMsg;

        this.timeout = setTimeout(() => {
            e!.style.display = "none";
            this._errorMsg = "";
            this.timeout = 0;
        }, 3000);
    }
}