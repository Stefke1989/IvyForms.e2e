<?php

namespace IvyForms\Services\Changelog;

// phpcs:disable PSR1.Files.SideEffects
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

use IvyForms\Services\Settings\SettingsService;

class ChangelogService
{
    /**
     * Get changelog data with translated strings.
     *
     * @return array{
     *     version: string,
     *     release_date: string,
     *     features: array<array{text: string}>,
     *     improvements: array<array{text: string}>,
     *     bugfixes: array<array{text: string}>
     * }
     */
    public static function getChangelogData(): array
    {
        $changelogData = [
            'version' => IVYFORMS_VERSION,
            'release_date' => '13.01.2025.',
            'features' => [
                ['text' => __('Implemented Turnstile integration 
                for security and spam protection.', 'ivyforms')],
                ['text' => __('Implemented hCaptcha integration 
                for security and spam protection.', 'ivyforms')],
                ['text' => __('Added several new Templates.', 'ivyforms')],
                ['text' => __('Enabled entry deletion via the “Delete” action 
                on the Entry Details page.', 'ivyforms')],

            ],
            'improvements' => [
                ['text' => __('Implemented comprehensive input validation 
                and improved error handling.', 'ivyforms')],
                ['text' => __('Added a loader to the Submit button.', 'ivyforms')],
                ['text' => __('Reorganized Template links and categories 
                for better usability.', 'ivyforms')],
                ['text' => __('Various UX/UI improvements and stability enhancements.', 'ivyforms')],

            ],
            'bugfixes' => [
                ['text' => __('Fixed issue with duplicate form name display 
                in Form Builder.', 'ivyforms')],
                ['text' => __('Fixed table blinking issue on window resize.', 'ivyforms')],
                ['text' => __('Fixed issue with fields options loader 
                not displaying correctly.', 'ivyforms')],
                ['text' => __('Fixed issue with opening a blank page on the Entries tab 
                when navigating from the Results page.', 'ivyforms')],
                ['text' => __('Fixed issue with duplicate form creation.', 'ivyforms')],
                ['text' => __('Fixed issue with form not displaying correctly after submit.', 'ivyforms')],
                ['text' => __('Fixed issue with creating a form from the All Forms page.', 'ivyforms')],

            ],
        ];

        /**
         * Filter changelog data to allow Pro plugin to add its own changelog entries
         *
         * @param array $changelogData The changelog data array
         * @return array Modified changelog data
         */
        return apply_filters('ivyforms/changelog/get_data', $changelogData);
    }
}
