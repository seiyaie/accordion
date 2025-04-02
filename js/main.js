/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
    // ビューポート要素を取得
    const viewportMeta = document.querySelector('meta[name="viewport"]');

    // 条件に基づいて適用するビューポートの設定を決定
    const viewportContent = window.outerWidth > 380 ? "width=device-width, initial-scale=1" : "width=380";

    // ビューポート要素が存在しない場合はreturn
    if (!viewportMeta) return;

    // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
    if (viewportMeta.getAttribute("content") !== viewportContent) {
        viewportMeta.setAttribute("content", viewportContent);
    }
};
switchViewport();
window.addEventListener("resize", switchViewport);

const accordion = () => {
    const details = document.querySelectorAll(".js-details");

    if (!details.length) return;

    details.forEach((el) => {
        const summary = el.querySelector(".js-summary");
        const content = el.querySelector(".js-content");

        if (!summary || !content) return;

        // Opening Keyframe
        const openingKeyframes = {
            height: [0, content.offsetHeight + "px"],
            opacity: [0, 1],
        };

        // Closing Keyframe
        const closingKeyframes = {
            height: [content.offsetHeight + "px", 0],
            opacity: [1, 0],
        };

        // 共通Option
        const options = {
            duration: 300,
            easing: "linear",
            fill: "forwards",
        };

        summary.addEventListener("click", (e) => {
            e.preventDefault();

            //アニメーション中の場合は処理を中断
            if (el.dataset.isAnimation === "true") {
                return;
            }

            if (el.open) {
                //閉じる処理
                el.dataset.isAnimation = "true";
                //閉じるアニメーションを実行
                const closeAnimation = content.animate(closingKeyframes, options);
                //アニメーション終了後にopen属性を削除し、isAnimationを解除
                closeAnimation.onfinish = () => {
                    el.removeAttribute("open");
                    el.dataset.isAnimation = "false";
                };
            } else {
                //開く処理
                el.setAttribute("open", "");
                el.dataset.isAnimation = "true";
                //開くアニメーションを実行
                const openAnimation = content.animate(openingKeyframes, options);
                //アニメーション終了後にisAnimationを解除
                openAnimation.onfinish = () => {
                    el.dataset.isAnimation = "false";
                };
            }
        });
    });
};

accordion();
