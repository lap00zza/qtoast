/**
 * MIT License
 *
 * Copyright (c) 2017 Jewel Mahanta
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.QToast = factory();
    }
}(this, function () {
    // TODO: work on defaults

    /* --- Utility Functions --- */
    /**
     * Converts a Toast object to a html element
     */
    const toastMaker = function (options) {
        const shell = document.createElement("div");
        shell.classList.add("qtoast");
        shell.style.position = "relative";
        shell.innerHTML =
            `<button class="qtoast__close" style="position: absolute; right: 4px; top: 4px;">X</button>
        <div class="qtoast__title">${options.title}</div>
        <div class="qtoast__body">${options.body}</div>`;
        return shell;
    };

    /**
     * Returns the toast container with initial styling applied.
     */
    const styledContainer = function (position) {
        const el = document.createElement("div");
        el.classList.add("qtoast__container");
        el.style.position = "absolute";
        switch (position) {
            case "topLeft":
                el.style.left = 0;
                el.style.top = 0;
                break;
            case "topRight":
                el.style.right = 0;
                el.style.top = 0;
                break;
        }
        return el;
    };

    /* --- QToast --- */
    /**
     * This will create the toast container and attach it to body.
     * Once done, the other methods like creating toasts can be used.
     */
    const QToast = function (options) {
        this.container = styledContainer(options.position);
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(this.container);
    };

    /**
     * Adds a new toast to the toast container and displays it.
     */
    QToast.prototype.show = function (options) {
        const t = this.container.appendChild(toastMaker(options));
        const t_timer = setTimeout(() => t.remove(), options.duration);
        const t_close = t.getElementsByClassName("qtoast__close")[0];
        t_close.addEventListener("click", () => {
            t.remove();
            clearTimeout(t_timer);
        });
    };

    return QToast;
}));
