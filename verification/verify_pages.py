from playwright.sync_api import sync_playwright

def verify_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify Home
        print("Visiting Home...")
        page.goto("http://localhost:3000")
        page.wait_for_selector('h1')
        print("Taking Home Screenshot...")
        page.screenshot(path="verification/home.png", full_page=True)

        # Verify Login
        print("Visiting Login...")
        page.goto("http://localhost:3000/login")
        page.wait_for_selector('form')
        print("Taking Login Screenshot...")
        page.screenshot(path="verification/login.png")

        browser.close()

if __name__ == "__main__":
    verify_pages()
