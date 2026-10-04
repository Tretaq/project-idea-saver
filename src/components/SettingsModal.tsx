type Props = {
    onClose: () => void;
    onExport: () => void;
    onImport: (file:File) => void;
    onReset: () => void;
    onClearDone: () => void;
}
export default function SettingsModal({onClose,onExport,onImport,onReset,onClearDone}: Props){
    return(
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                {/* stop propagation stops the click coming up to the parrent */}
                <div className="modal-head">
                    <h2>Settings</h2>
                    <button onClick={onClose}>X</button>
                </div>
                <section>
                    <h3>Data JSON</h3>
                    <button onClick={onExport}>Export JSON</button>
                    <label className="file-btn">
                        Import JSON
                        <input type="file" accept=".json" hidden onChange={e => e.target.files?.[0] && onImport(e.target.files[0])} />
                    </label>
                </section>
                <section>
                    <h3>Tools</h3>
                    <button onClick={() => confirm("Mark every project as not done?") && onClearDone()}>
                        Mark all as not done
                    </button>
                    <button onClick={() => confirm("Mark every project as not done?") && onReset()}>
                        Reset to defaults
                    </button>
                </section>
            </div>
        </div>
    )
}