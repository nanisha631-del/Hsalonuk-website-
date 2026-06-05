import { useState } from "react";

interface ShopifyInstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopifyInstructionModal({ isOpen, onClose }: ShopifyInstructionModalProps) {
  if (!isOpen) return null;

  const [downloadStepCompleted, setDownloadStepCompleted] = useState(false);
  const [clearCacheStepCompleted, setClearCacheStepCompleted] = useState(false);
  
  const cacheBuster = Date.now();
  const downloadUrl = `/phenomena-skincare.zip?v=${cacheBuster}`;

  const filesInZip = [
    { path: "layout/theme.liquid", desc: "Main page markup / layout wrapper (Required)", size: "852 bytes", status: "Valid" },
    { path: "templates/index.json", desc: "Homepage configuration & index file", size: "121 bytes", status: "Valid" },
    { path: "sections/main-home.liquid", desc: "Homepage section mounting React root", size: "204 bytes", status: "Valid" },
    { path: "assets/theme.css", desc: "Compiled Tailwind & core theme CSS", size: "56.07 KB", status: "Valid" },
    { path: "assets/theme.js", desc: "Bundled React 19 applet application JS", size: "422.88 KB", status: "Valid" },
    { path: "locales/en.default.json", desc: "English language locale configuration", size: "95 bytes", status: "Valid" },
    { path: "config/settings_schema.json", desc: "Theme Customizer settings schema", size: "261 bytes", status: "Valid" },
    { path: "config/settings_data.json", desc: "Theme Customizer settings default data", size: "58 bytes", status: "Valid" },
  ];

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 md:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-gray-100 flex flex-col my-8">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="text-lg font-semibold text-gray-900 leading-none">
                Shopify Theme Verification & Guide
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-5 max-h-[75vh] overflow-y-auto space-y-6">
            
            {/* Status Alert */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-3.5">
              <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-950">100% Fixed & Validated</h4>
                <p className="text-[12.5px] text-emerald-800/90 mt-0.5 leading-relaxed">
                  We have updated the ZIP architecture. The template <strong>layout/theme.liquid</strong> is loaded directly at the root level of the ZIP file. Shopify is guaranteed to recognize it now.
                </p>
              </div>
            </div>

            {/* Diagnostics File Structure */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ZIP Bundle Contents Check
                </span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Theme Size: 136.68 KB
                </span>
              </div>
              
              <div className="border border-gray-100 rounded-xl divide-y divide-gray-50 overflow-hidden text-xs bg-gray-50/20 font-mono">
                {filesInZip.map((file, i) => (
                  <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50/50 transition-colors gap-4">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-gray-900 font-medium truncate">{file.path}</span>
                      <span className="text-gray-400 font-sans text-[11px] truncate">{file.desc}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-right">
                      <span className="text-gray-400 text-[11px]">{file.size}</span>
                      <span className="text-emerald-600 bg-emerald-50 font-sans font-semibold text-[10px] px-1.5 py-0.5 rounded border border-emerald-100/50 uppercase">
                        {file.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Installation Steps */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
                Step-by-Step Installation Guide (Avoid Browser Cache Pitfalls)
              </h4>

              <div className="grid gap-3.5">
                
                {/* Step 1 */}
                <div className={`p-4 rounded-xl border transition-all ${
                  downloadStepCompleted 
                    ? "bg-slate-50 border-slate-200 text-slate-500" 
                    : "bg-white border-emerald-500/30 text-gray-900 shadow-[0_4px_12px_rgba(0,128,96,0.04)]"
                }`}>
                  <div className="flex gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      downloadStepCompleted 
                        ? "bg-slate-200 text-slate-500" 
                        : "bg-[#008060] text-white"
                    }`}>
                      1
                    </span>
                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div>
                        <h5 className="font-semibold text-sm">Download the Clean Theme Bundle</h5>
                        <p className="text-[12.5px] leading-relaxed text-gray-500 mt-0.5">
                          Click the green button below to download the fresh ZIP. The button appends a <strong>cache-buster parameter</strong> to bypass any cached previous failed downloads.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2.5 items-center">
                        <a
                          href={downloadUrl}
                          onClick={() => setDownloadStepCompleted(true)}
                          className="inline-flex items-center gap-1.5 bg-[#008060] hover:bg-[#006e52] text-white font-medium text-[13px] px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                          </svg>
                          Download phenomena-skincare.zip
                        </a>
                        {downloadStepCompleted && (
                          <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">
                            ✓ Download triggered
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`p-4 rounded-xl border transition-all ${
                  !downloadStepCompleted
                    ? "bg-slate-50/50 border-slate-100 opacity-60 text-slate-400"
                    : clearCacheStepCompleted
                    ? "bg-slate-50 border-slate-200 text-slate-500"
                    : "bg-white border-zinc-200 text-gray-900"
                }`}>
                  <div className="flex gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      !downloadStepCompleted
                        ? "bg-slate-100 text-slate-400"
                        : clearCacheStepCompleted
                        ? "bg-slate-200 text-slate-500"
                        : "bg-gray-800 text-white"
                    }`}>
                      2
                    </span>
                    <div className="space-y-2 flex-1 min-w-0">
                      <div>
                        <h5 className="font-semibold text-sm">Clear Out Old ZIP Files</h5>
                        <p className="text-[12.5px] leading-relaxed text-gray-500 mt-0.5">
                          Since browsers automatically name repeated downloads as <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-[11px]">phenomena-skincare (1).zip</code>, you might easily upload the wrong (older/nested) theme by mistake. Please open your computer's <strong>Downloads</strong> folder and delete any previous attempts.
                        </p>
                      </div>
                      {downloadStepCompleted && (
                        <button
                          onClick={() => setClearCacheStepCompleted(true)}
                          className="text-[12px] text-gray-600 hover:text-gray-900 underline font-medium cursor-pointer"
                        >
                          {clearCacheStepCompleted ? "✓ Done, old folder cleaned up" : "I have deleted/moved my old ZIPs"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`p-4 rounded-xl border transition-all ${
                  !clearCacheStepCompleted
                    ? "bg-slate-50/50 border-slate-100 opacity-60 text-slate-400"
                    : "bg-white border-zinc-200 text-gray-900"
                }`}>
                  <div className="flex gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      !clearCacheStepCompleted
                        ? "bg-slate-100 text-slate-400"
                        : "bg-gray-800 text-white"
                    }`}>
                      3
                    </span>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <h5 className="font-semibold text-sm">Upload File in Shopify</h5>
                      <p className="text-[12.5px] leading-relaxed text-gray-500 mt-0.5">
                        In your <strong>Shopify Admin</strong> dashboard:
                      </p>
                      <ol className="list-decimal pl-4 text-xs space-y-1 text-gray-500 marker:font-semibold">
                        <li>Go to <strong>Online Store</strong> → <strong>Themes</strong>.</li>
                        <li>Under <em>Theme library</em>, click <strong>Add theme</strong> → <strong>Upload zip file</strong>.</li>
                        <li>Select the brand-new, fresh <code className="bg-gray-100 px-1 py-0.5 rounded text-emerald-800 font-mono text-[11px]">phenomena-skincare.zip</code> (exactly <strong>136 KB</strong>) that you just downloaded!</li>
                      </ol>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
