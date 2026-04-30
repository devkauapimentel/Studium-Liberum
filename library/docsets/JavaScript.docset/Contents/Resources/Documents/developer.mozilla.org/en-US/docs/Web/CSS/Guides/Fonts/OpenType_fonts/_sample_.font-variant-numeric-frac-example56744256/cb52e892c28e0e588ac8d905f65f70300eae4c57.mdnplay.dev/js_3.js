
          try {
            window.parent.postMessage({ typ: "ready" }, "*");
          } catch (e) {
            console.error("[Playground] Failed to post ready message", e);
          }
        