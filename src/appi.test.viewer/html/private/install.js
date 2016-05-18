    /**
     * install
     *
     * Instala o HTML Viewer para AppiTest.
     */
    function install() {
        $test.registerViewer({
            'setup': setup,
            'starting': starting,
            'startingComponent': startingComponent,
            'startingScenario': startingScenario,
            'startingPremisse': startingPremisse,
            'finishingPremisse': finishingPremisse,
            'finishingScenario': finishingScenario,
            'finishingComponent': finishingComponent,
            'finishing': finishing
        });
    }